import React, { Component } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../../enums';
import { DropDown, DropDownInput, DropDownInputBox, TextComponent, TextInputBox } from '../../../../../shared';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { stateLookupData } from '../../../../../redux/SvishrAction';
import { MiddlewareCheck } from '../../../../../services/middleware';
import { ErrorCode } from '../../../../../services/constant';
import styles from './Style';

// this is mentor bit component 
class MentorBit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: this.props.allData,
            nationalityText: "",
            nationalityArr: [],
            pageloader: true,
            nameActive: false,
            phoneActive: false


        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
        let lookUpData = this.props.SvishrRedux.stateLookupData;
        this.state.allData.genderArr = lookUpData.GENDER_TYPE;
        this.setState({
            allData: this.state.allData
        })
        await this._nationalityApiCall()
        this.setState({ pageloader: false })
    }

    // here nationality api call
    _nationalityApiCall = async () => {
        let responseData = await MiddlewareCheck("getAllNationality", {}, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allData.nationalityArr = responseData.data;
                this.setState({
                    allData: this.state.allData,
                    nationalityArr: this.state.allData.nationalityArr
                });
            }
        }
    }


    // this function used for name text change
    _nameTextChange = (value) => {
        this.state.allData.fullNameText = value;
        this.setState({ allData: this.state.allData });
        this.props.fullNameChange(this.state.allData.fullNameText);
    }
    // this function used for phone text change 
    _phoneTextChange = (value) => {
        this.state.allData.phoneText = value;
        this.setState({ allData: this.state.allData });
        this.props.phoneChangeText(this.state.allData.phoneText);
    }

    // this function used for select gendor  
    _onSelectGender = (value) => {
        this.state.phoneActive = false;
        this.state.allData.selectedGenderObj = value;
        this.setState({ allData: this.state.allData });
        this.props.selectGendor(this.state.allData.selectedGenderObj);
    }

    // this  function used for select nationality
    _onSelectNationality = (value) => {
        this.state.allData.selectedNationalityObj = value;
        this.setState({ nationalityText: "" })
        this.setState({ allData: this.state.allData });
        this.props.selectNationality(this.state.allData.selectedNationalityObj);
    }
    // this is nationality onchange function 
    nationalityTextChange = (value) => {
        const filteredNationalityArr = this.state.allData.nationalityArr.filter(nationality =>
            nationality.name.toLowerCase().includes(value.toLowerCase())
        );
        this.setState({
            nationalityText: value,
            nationalityArr: filteredNationalityArr
        });
    }
    // this is name input focus function 
    nameInputFocus = () => {
        this.state.nameActive = true;
        this.state.phoneActive = false;
        this.setState(this.state);

    }
    onNameBlur = () => {
        this.state.nameActive = true;
        this.state.phoneActive = false;
        this.setState(this.state);
    }
    // this is phone input focus 
    phoneInputFocus = () => {
        this.state.phoneActive = true;
        this.state.nameActive = false;
        this.setState(this.state);
    }
    onphoneBlur = () => {
        this.state.phoneActive = true;
        this.state.nameActive = false;
        this.setState(this.state);
    }
    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>

                {
                    this.state.pageloader ?
                        <View style={styles.loaderSec}>
                            <ActivityIndicator size="large" color={Color.COLOR.BLACK.DARK_BLACK} />
                        </View> :
                        <>
                            <View style={{ marginHorizontal: '8%', marginTop: '5%' }}>
                                <TextComponent text={"Let’s get to know you a bit!"} additionalStyles={styles.titleText} props={this.props} />
                            </View>
                            <View style={{ marginBottom: 8 }} />
                            <ScrollView showsVerticalScrollIndicator={false} >
                                <View style={{ marginHorizontal: '8%', }}>
                                    <View style={{ marginTop: 20 }}>
                                        <TextComponent text={"Full Name"} additionalStyles={styles.labelText} props={this.props} />
                                        <TextInputBox
                                            placeholder={"Name"}
                                            value={this.state.allData.fullNameText}
                                            onChangeText={(value) => this._nameTextChange(value)}
                                            height={50}
                                            additionalBoxStyle={{ height: 50, marginTop: 5 }}
                                            borderRadius={10}
                                            isActive={this.state.nameActive}
                                            onFocus={() => this.nameInputFocus()}
                                            onBlur={() => this.onNameBlur()}
                                        />
                                    </View>
                                    <TextComponent text={this.state.allData.nameError} additionalStyles={styles.errorMsgText} props={this.props} />
                                    <View style={{ marginTop: 5 }}>
                                        <TextComponent text={"Phone"} additionalStyles={styles.labelText} props={this.props} />
                                        <TextInputBox
                                            placeholder={"Phone No"}
                                            value={this.state.allData.phoneText}
                                            onChangeText={(value) => this._phoneTextChange(value)}
                                            height={50}
                                            keyboardType="numeric"
                                            maxLength={12}
                                            additionalBoxStyle={{ height: 50, marginTop: 5 }}
                                            borderRadius={10}
                                            isActive={this.state.phoneActive}
                                            onFocus={() => this.phoneInputFocus()}
                                            onBlur={() => this.onphoneBlur()}
                                        />
                                    </View>
                                    <TextComponent text={this.state.allData.phoneError} additionalStyles={styles.errorMsgText} props={this.props} />

                                    <View style={{ marginTop: 5 }}>
                                        <TextComponent text={"Gender"} additionalStyles={styles.labelText} props={this.props} />
                                        <View style={{ marginTop: 5 }}>
                                            {/* <DropDown
                                                    selectedValue={this.state.allData.selectedGenderObj.id ? this.state.allData.selectedGenderObj.id.toString() : "0"}
                                                    options={this.state.allData.genderArr}
                                                    onSelect={(value) => this._onSelectGender(value)}
                                                    headerText={"Select Gender*"}
                                                    padding={18}
                                                    isSearchable={false}
                                                /> */}

                                            <DropDownInputBox
                                                selectedValue={this.state.allData.selectedGenderObj.id ? this.state.allData.selectedGenderObj.id.toString() : "0"}
                                                data={this.state.allData.genderArr}
                                                onSelect={(value) => this._onSelectGender(value)}
                                                isBackButtonPressRequired={true}
                                                isBackdropPressRequired={true}
                                                headerText={"Select Gender*"}
                                                selectedTextColor={"#479690"}
                                                unSelectedTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                                borderRadius={10}
                                                height={50}
                                                modalHeaderText={"Select Gender"}
                                                selectedColor={"#E3F9F8"}
                                            />

                                            {/* <DropdownInputBox
                                                selectedValue={this.state.projectName.id ? this.state.projectName.id.toString() : "0"}
                                                data={title}
                                                onSelect={(value) => OnSelectProjectName(value)}
                                                headerText={"Project Name"}
                                                isBackButtonPressRequired={true}
                                                isBackdropPressRequired={true}
                                            /> */}
                                        </View>
                                    </View>
                                    <TextComponent text={this.state.allData.genderError} additionalStyles={styles.errorMsgText} props={this.props} />

                                    <View style={{ marginTop: 5 }}>
                                        <TextComponent text={"Nationality"} additionalStyles={styles.labelText} props={this.props} />
                                        <View style={{ marginTop: 5 }}>
                                            {/* <DropDown
                                                selectedValue={this.state.allData.selectedNationalityObj.id ? this.state.allData.selectedNationalityObj.id.toString() : "0"}
                                                options={this.state.nationalityArr}
                                                onSelect={(value) => this._onSelectNationality(value)}
                                                headerText={"Select Nationality*"}
                                                padding={18}
                                                onChangeText={(value) => this.nationalityTextChange(value)}
                                                value={this.state.nationalityText}
                                                placeholder={"Search Nationality ....."}
                                            /> */}
                                            <DropDownInputBox
                                                selectedValue={this.state.allData.selectedNationalityObj.id ? this.state.allData.selectedNationalityObj.id.toString() : "0"}
                                                data={this.state.nationalityArr}
                                                onSelect={(value) => this._onSelectNationality(value)}
                                                isBackButtonPressRequired={true}
                                                isBackdropPressRequired={true}
                                                headerText={"Select Nationality*"}
                                                selectedTextColor={"#479690"}
                                                unSelectedTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                                borderRadius={10}
                                                height={50}
                                                isSearchable={true}
                                                onChangeSearch={(value) => this.nationalityTextChange(value)}
                                                modalHeaderText={"Select Nationality"}
                                                selectedColor={"#E3F9F8"}

                                            />
                                        </View>
                                    </View>
                                    <TextComponent text={this.state.allData.nationalityError} additionalStyles={styles.errorMsgText} props={this.props} />

                                </View>
                                <View style={{ marginBottom: 300 }} />
                            </ScrollView>
                        </>
                }
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const { SvishrRedux } = state
    return { SvishrRedux }

};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateLookupData
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MentorBit);
