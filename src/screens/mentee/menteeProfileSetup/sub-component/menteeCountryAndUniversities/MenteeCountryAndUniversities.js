import React, { Component } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../../enums';
import { DropDown, DropDownInputBox, TextComponent, TextInputBox } from '../../../../../shared';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MiddlewareCheck } from '../../../../../services/middleware';
import { ErrorCode } from '../../../../../services/constant';
import { Toaster } from '../../../../../services/common-view-function';
import styles from './Style';

// this is mentee country and universities component
class MenteeCountryAndUniversities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameText: "",
            countryCode: "",
            allData: this.props.allData,
            pageloader: true,
            data: [],
            countrySearchText: "",
            countryArr: [],
            universitySearchText: "",
            universityArr: [],

        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
        let countryId = this.state.allData.selectCountryObj.id
        if (countryId == null) {
            null
        } else {
            await this._onUniversityApi(countryId);
            let reqData = { countryId: countryId }
            let universitydata = await MiddlewareCheck("getUniversities", reqData, this.props)
            if (universitydata.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.allData.universityArr = universitydata.data;
                this.setState({
                    allData: this.state.allData,
                });
                let universityData = this.state.allData.universityArr
                let profileInfoUniversitiesId = this.state.allData.profileInfoUniversitiesId
                for (let i = 0; i < universityData.length; i++) {
                    for (let j = 0; j < profileInfoUniversitiesId.length; j++) {
                        if (universityData[i].id == profileInfoUniversitiesId[j]) {
                            let pushData = universityData[i];
                            this.state.allData.selectedUniversity.push(pushData)
                            this.state.allData.selectedUniversitiesId.push(pushData.id)
                        }

                    }

                }
            }
        }
        await this.allCountryData();
        // await this.universityData();
        this.setState({ pageloader: false })
    }
    // this is the function which is called country data 
    allCountryData = async () => {
        let countryData = await MiddlewareCheck("getAllCountry", {}, this.props)
        if (countryData) {
            if (countryData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let data = countryData.data;
                this.state.allData.countryArr = data;
                this.setState({
                    allData: this.state.allData,
                    countryArr: this.state.allData.countryArr
                });
            }
        }

    }
    // this is the function which is called universities api call 
    _onUniversityApi = async (value) => {
        let reqData = {
            countryId: 15
        }
        let universitydata = await MiddlewareCheck("getUniversities", reqData, this.props)
        if (universitydata.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            this.state.allData.universityArr = universitydata.data;
            this.setState({
                allData: this.state.allData,
                universityArr: this.state.allData.universityArr
            });

            let universityData = this.state.allData.universityArr
            let profileInfoUniversitiesId = this.state.allData.profileInfoUniversitiesId
            // for (let i = 0; i < universityData.length; i++) {
            //     for (let j = 0; j < profileInfoUniversitiesId.length; j++) {
            //         if (universityData[i].id == profileInfoUniversitiesId[j]) {
            //             let pushData = universityData[i];
            //             this.state.allData.selectedUniversity.push(pushData)
            //         }

            //     }

            // }
        }
    }
    // this function used for select country 
    _onSelectCountry = (value) => {
        this.state.allData.selectCountryObj = value;
        this.setState({ allData: this.state.allData, countrySearchText: "", });
        this._onUniversityApi(this.state.allData.selectCountryObj.id);
        this.props.selectCountry(this.state.allData.selectCountryObj);
    }
    // this function used for select universities 
    _onSelectUniversities = (value) => {
        this.state.allData.selectedUniversityObj = value;
        this.state.allData.universityError = "";
        this.setState({ allData: this.state.allData, universitySearchText: "", });
        const isAlreadySelected = this.state.allData.selectedUniversity.some(university => university.id === value.id);
        if (isAlreadySelected) {
            this.state.allData.universityError = "You can't select same universities !";
            this.setState({ allData: this.state.allData })
        } else if (this.state.allData.selectedUniversity.length >= 3) {
            // this.state.allData.universityError = "3 of 3 selected !";
            // this.setState({ allData: this.state.allData })
            // this.state.allData.universityError = "";
            // this.setState({ allData: this.state.allData })
            Toaster.ShortCenterToaster("3 of 3 selected !")
        } else {
            this.state.allData.selectedUniversity.push(this.state.allData.selectedUniversityObj)
            this.state.allData.selectedUniversitiesId.push(this.state.allData.selectedUniversityObj.id)
            this.props.selectUniversities(this.state.allData.selectedUniversityObj);

        }

    }
    // this is the country onChange function 
    countryTextChange = (value) => {
        const filteredCountryArr = this.state.allData.countryArr.filter(country =>
            country.name.toLowerCase().includes(value.toLowerCase())
        );
        this.setState({
            countrySearchText: value,
            countryArr: filteredCountryArr
        });
    }
    // this is the university onChange function 
    universityTextChange = (value) => {
        const filtereUniversityyArr = this.state.allData.universityArr.filter(university =>
            university.name.toLowerCase().includes(value.toLowerCase())
        );
        this.setState({
            universitySearchText: value,
            universityArr: filtereUniversityyArr
        });
    }
    _onDelete = (index) => {
        this.props.deleteUniversities(index)
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
                            <View style={{ marginHorizontal: '8%', marginTop: '5%' }}>
                                <TextComponent text={"Choose a country and its universities to find mentors"} additionalStyles={styles.titleText} props={this.props} />
                            </View>
                            <View style={{ marginBottom: 8 }} />
                            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                <View style={{ marginHorizontal: '8%' }}>
                                    <View style={{ marginTop: 10 }}>
                                        <TextComponent text="Country of application" additionalStyles={styles.labelText} props={this.props} />
                                        <View style={{ marginTop: 5 }}>
                                            <DropDownInputBox
                                                selectedValue={this.state.allData.selectCountryObj.id ? this.state.allData.selectCountryObj.id.toString() : "0"}
                                                data={this.state.countryArr}
                                                onSelect={(value) => this._onSelectCountry(value)}
                                                isBackButtonPressRequired={true}
                                                isBackdropPressRequired={true}
                                                headerText={"Select Country*"}
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
                                    <TextComponent text={this.state.allData.countryError} additionalStyles={styles.errorTextMsg} props={this.props} />

                                    <View style={{}}>
                                        <TextComponent text="Select up to 3 universities" additionalStyles={styles.labelText} props={this.props} />
                                        <View style={{ marginTop: 5 }}>
                                            <DropDownInputBox
                                                selectedValue={this.state.allData.selectedUniversityObj.id ? this.state.allData.selectedUniversityObj.id.toString() : "0"}
                                                data={this.state.universityArr}
                                                onSelect={(value) => this._onSelectUniversities(value)}
                                                isBackButtonPressRequired={true}
                                                isBackdropPressRequired={true}
                                                headerText={this.state.allData.selectedUniversity.length < 3 ? "Select universities*" : "3 of 3 selected"}
                                                selectedTextColor={"#479690"}
                                                unSelectedTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                                borderRadius={10}
                                                height={50}
                                                isSearchable={true}
                                                onChangeSearch={(value) => this.universityTextChange(value)}
                                                modalHeaderText={"Select Universities"}
                                                selectedColor={"#E3F9F8"}


                                            />
                                        </View>
                                    </View>
                                    <TextComponent text={this.state.allData.universityError} additionalStyles={styles.errorTextMsg} props={this.props} />
                                    <View style={{ marginTop: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {this.state.allData.selectedUniversity.map((item, index) => (
                                            <View key={index} style={styles.universityList}>
                                                <TextComponent text={item.name} additionalStyles={styles.universityText} />
                                                <View style={{ width: 8 }} />
                                                <TouchableOpacity onPress={() => this._onDelete(index)} activeOpacity={0.7}>
                                                    <Image source={ImageName.CIRCEL_CROSS} style={{ height: 15, width: 15 }} />
                                                </TouchableOpacity>
                                            </View>
                                        ))
                                        }
                                    </View>

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

    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MenteeCountryAndUniversities);
