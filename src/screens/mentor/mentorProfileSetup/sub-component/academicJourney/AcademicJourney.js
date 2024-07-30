import React, { Component } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, View, DatePickerAndroid } from 'react-native';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../../enums';
import { DropDown, DropDownInputBox, SingleSelectModalDropdown, TextComponent, TextInputBox } from '../../../../../shared';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { stateLookupData } from '../../../../../redux/SvishrAction';
import { MiddlewareCheck } from '../../../../../services/middleware';
import { ErrorCode } from '../../../../../services/constant';
import { all } from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { modDateData } from './Function';
import styles from './Style';


// this is mentor academic journey component
class AcademicJourney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: this.props.allData,
            countrySearchTxt: "",
            universitySearchTxt: "",
            degreeSearchTxt: "",
            fieldSearchTxt: "",
            specializationSearchTxt: "",
            countryArr: [],
            universityArr: [],
            degreeArr: [],
            fieldArr: [],
            specializationArr: [],
            pageloader: true,
            yearData: [],

        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
        this.state.yearData = this.state.allData.yearData
        this.setState(this.state)
        if (this.state.allData.selectCountryObj.id !== undefined && this.state.allData.selectCountryObj.id !== null) {
            await this._onUniversityApi(this.state.allData.selectCountryObj.id);
        }
        let lookUpData = this.props.SvishrRedux.stateLookupData;
        this.state.allData.degreeArr = lookUpData.DEGREE;
        this.state.allData.fieldArr = lookUpData.FIELD;
        this.state.allData.specializationArr = lookUpData.SPECIALIZATION;
        this.setState({
            allData: this.state.allData,
            degreeArr: this.state.allData.degreeArr,
            fieldArr: this.state.allData.fieldArr,
            specializationArr: this.state.allData.specializationArr
        });
        await this._onCountryApi();
        this.setState({ pageloader: false })

    }

    // this function used for country api call
    _onCountryApi = async () => {
        let responseData = await MiddlewareCheck("getAllCountry", {}, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allData.countryArr = responseData.data;
                this.setState({
                    allData: this.state.allData,
                    countryArr: this.state.allData.countryArr
                });
            }
        }
    }

    // this function used for university api call
    _onUniversityApi = async (value) => {
        let reqData = { countryId: value };
        let responseData = await MiddlewareCheck("getUniversities", reqData, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allData.universityArr = responseData.data;
                this.setState({
                    allData: this.state.allData,
                    universityArr: this.state.allData.universityArr
                });
            }
        }
    }

    // this function used for select country 
    _onSelectCountry = (value) => {
        this.state.allData.selectCountryObj = value;
        this.setState({ allData: this.state.allData, countrySearchTxt: "" });
        this._onUniversityApi(this.state.allData.selectCountryObj.id);
        this.props.selectCountry(this.state.allData.selectCountryObj);
    }

    // this function used for select uni
    _onSelectUniversity = (value) => {
        this.state.allData.selectedUniversityObj = value;
        this.setState({ allData: this.state.allData, universitySearchTxt: "" });
        this.props.selectUniversity(this.state.allData.selectedUniversityObj);
    }

    // this function used for degree select 
    _onSelectDegree = (value) => {
        this.state.allData.selectedDegreeObj = value;
        this.setState({ allData: this.state.allData, degreeSearchTxt: "" });
        this.props.selectOnDegree(this.state.allData.selectedDegreeObj);
    }

    // this function used for select field 
    _onSelectField = (value) => {
        this.state.allData.selectedFieldObj = value;
        this.setState({ allData: this.state.allData, fieldSearchTxt: "" });
        this.props.selectField(this.state.allData.selectedFieldObj);
    }
    // this is country text onChange function 
    countryTextChange = (value) => {
        const filteredCountryArr = this.state.allData.countryArr.filter(country =>
            country.name.toLowerCase().includes(value.toLowerCase())
        );
        this.setState({
            countrySearchTxt: value,
            countryArr: filteredCountryArr
        });
    }
    // this is university text onChange function 
    universityTextChange = (value) => {
        const filteredUniversityArr = this.state.allData.universityArr.filter(university =>
            university.name.toLowerCase().includes(value.toLowerCase())
        );
        this.setState({
            universitySearchTxt: value,
            universityArr: filteredUniversityArr
        });
    }
    // this is degree text onChange function 
    degreeTextChange = (value) => {
        const filteredDegreeyArr = this.state.allData.degreeArr.filter(degree =>
            degree.name.toLowerCase().includes(value.toLowerCase())
        );
        this.setState({
            degreeSearchTxt: value,
            degreeArr: filteredDegreeyArr
        });
    }
    // this is field text onChange function 
    fieldTextChange = (value) => {
        const filteredFieldArr = this.state.allData.fieldArr.filter(field =>
            field.name.toLowerCase().includes(value.toLowerCase())
        );
        this.setState({
            fieldSearchTxt: value,
            fieldArr: filteredFieldArr
        });
    }
    // this function used for expected graduation year 
    onSelectGraduation = (value) => {
        this.state.allData.selectedDateObj = value;
        this.setState({ allData: this.state.allData });
        this.props.selectExpectGraduation(this.state.allData.selectedDateObj);
    }

    // this is the main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {
                    this.state.pageloader ?
                        <View style={styles.loaderSec}>
                            <ActivityIndicator size="large" color={Color.COLOR.BLACK.DARK_BLACK} />
                        </View> :

                        <>
                            <View style={{ marginTop: '5%', marginHorizontal: '8%' }}>
                                <TextComponent text={"Share your academic journey"} additionalStyles={styles.titleText} props={this.props} />
                            </View>
                            <View style={{ marginBottom: 8 }} />
                            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                <View style={{ marginHorizontal: '8%' }}>
                                    <View style={{ marginTop: 20 }}>
                                        <TextComponent text={"Country"} additionalStyles={styles.labelText} props={this.props} />
                                        <View style={{ marginTop: 5 }}>

                                            <DropDownInputBox
                                                selectedValue={this.state.allData.selectCountryObj.id ? this.state.allData.selectCountryObj.id.toString() : "0"}
                                                data={this.state.countryArr}
                                                onSelect={(value) => this._onSelectCountry(value)}
                                                isBackButtonPressRequired={true}
                                                isBackdropPressRequired={true}
                                                headerText={"Select Country"}
                                                selectedTextColor={"#479690"}
                                                unSelectedTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                                borderRadius={10}
                                                height={50}
                                                isSearchable={true}
                                                onChangeSearch={(value) => this.countryTextChange(value)}
                                                modalHeaderText={"Select Country"}
                                                selectedColor={"#E3F9F8"}
                                            />
                                        </View>
                                    </View>
                                    <TextComponent text={this.state.allData.countryError} additionalStyles={styles.errorMsgText} props={this.props} />

                                    <View style={{ marginTop: 5 }}>
                                        <TextComponent text={"University"} additionalStyles={styles.labelText} props={this.props} />
                                        <View style={{ marginTop: 5 }}>
                                            <DropDownInputBox
                                                selectedValue={this.state.allData.selectedUniversityObj.id ? this.state.allData.selectedUniversityObj.id.toString() : "0"}
                                                data={this.state.universityArr}
                                                onSelect={(value) => this._onSelectUniversity(value)}
                                                isBackButtonPressRequired={true}
                                                isBackdropPressRequired={true}
                                                headerText={"Select University"}
                                                selectedTextColor={"#479690"}
                                                unSelectedTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                                borderRadius={10}
                                                height={50}
                                                isSearchable={true}
                                                onChangeSearch={(value) => this.universityTextChange(value)}
                                                modalHeaderText={"Select University"}
                                                selectedColor={"#E3F9F8"}
                                            />
                                        </View>
                                    </View>
                                    <TextComponent text={this.state.allData.universityError} additionalStyles={styles.errorMsgText} props={this.props} />

                                    <View style={{ marginTop: 5 }}>
                                        <TextComponent text={"Degree"} additionalStyles={styles.labelText} props={this.props} />
                                        <View style={{ marginTop: 5 }}>
                                            <DropDownInputBox
                                                selectedValue={this.state.allData.selectedDegreeObj.id ? this.state.allData.selectedDegreeObj.id.toString() : "0"}
                                                data={this.state.degreeArr}
                                                onSelect={(value) => this._onSelectDegree(value)}
                                                isBackButtonPressRequired={true}
                                                isBackdropPressRequired={true}
                                                headerText={"Select Degree"}
                                                selectedTextColor={"#479690"}
                                                unSelectedTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                                borderRadius={10}
                                                height={50}
                                                isSearchable={true}
                                                onChangeSearch={(value) => this.degreeTextChange(value)}
                                                modalHeaderText={"Select Degree"}
                                                selectedColor={"#E3F9F8"}
                                            />
                                        </View>
                                    </View>
                                    <TextComponent text={this.state.allData.degreeError} additionalStyles={styles.errorMsgText} props={this.props} />

                                    <View style={{ marginTop: 5 }}>
                                        <TextComponent text={"Field"} additionalStyles={styles.labelText} props={this.props} />
                                        <View style={{ marginTop: 5 }}>
                                            <DropDownInputBox
                                                selectedValue={this.state.allData.selectedFieldObj.id ? this.state.allData.selectedFieldObj.id.toString() : "0"}
                                                data={this.state.fieldArr}
                                                onSelect={(value) => this._onSelectField(value)}
                                                isBackButtonPressRequired={true}
                                                isBackdropPressRequired={true}
                                                headerText={"Select Field"}
                                                selectedTextColor={"#479690"}
                                                unSelectedTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                                borderRadius={10}
                                                height={50}
                                                isSearchable={true}
                                                onChangeSearch={(value) => this.fieldTextChange(value)}
                                                modalHeaderText={"Select Field"}
                                                selectedColor={"#E3F9F8"}
                                            />
                                        </View>
                                    </View>
                                    <TextComponent text={this.state.allData.fieldError} additionalStyles={styles.errorMsgText} props={this.props} />

                                    <View style={{ marginTop: 5 }}>
                                        <TextComponent text={"Expected Graduation"} additionalStyles={styles.labelText} props={this.props} />
                                        <View style={{ marginTop: 5 }}>
                                            <DropDownInputBox
                                                selectedValue={this.state.allData.selectedDateObj.id ? this.state.allData.selectedDateObj.id.toString() : "0"}
                                                data={this.state.yearData}
                                                onSelect={(value) => this.onSelectGraduation(value)}
                                                isBackButtonPressRequired={true}
                                                isBackdropPressRequired={true}
                                                headerText={"Select Expected Graduation"}
                                                selectedTextColor={"#479690"}
                                                unSelectedTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                                borderRadius={10}
                                                height={50}
                                                modalHeaderText={"Select Expected Graduation"}
                                                selectedColor={"#E3F9F8"}
                                            />
                                        </View>
                                    </View>
                                    <TextComponent text={this.state.allData.expectedGraduationError} additionalStyles={styles.errorMsgText} props={this.props} />


                                    <View style={{ marginBottom: 300 }} />
                                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(AcademicJourney);
