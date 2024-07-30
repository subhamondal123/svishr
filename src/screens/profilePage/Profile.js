import React, { Component } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Share, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../enums';
import { TextComponent, LogOutModal, DropDown, ProfileDropDown } from '../../shared';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from './Style';
import { MiddlewareCheck, MiddlewareFileCheck } from '../../services/middleware';
import { ErrorCode } from '../../services/constant';
import { StorageDataModification, Toaster, WebUriLinking } from '../../services/common-view-function';
import { modifyProfileData } from './Function';
import { stateLookupData } from '../../redux/SvishrAction';
import { CommonActions } from '@react-navigation/native';
import { clearStorage } from '../../services/async-storage';
import { App_uri } from '../../services/config';
import SvgComponent from '../../assets/svg';

// this is profile page
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailText: "",
            loginType: "",
            profileData: {},
            pageLoader: true,
            genderType: "",
            hobbiesType: "",
            countryCode: "",
            isModalVisible: false,
            isLoading: false,
            hobbiesData: [],
            universityData: "",
            isShow: false,
        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        await this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
        let userInfo = await StorageDataModification.userData({}, "get");
        let typeData = await StorageDataModification.loginTypeData({}, "get");
        let userId = userInfo.userInfo.userId;
        let userTypeId = userInfo.userInfo.userTypeId;
        this.state.loginType = typeData;
        this.setState(this.state);
        let reqData = {
            userId: userId,
            userTypeId: userTypeId
        }
        let responseData = await MiddlewareCheck("getProfileInfo", reqData, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.allCountryData();
                this.state.profileData = modifyProfileData(responseData.data);
                await this.universityData(this.state.profileData.countryId);
                let lookUpHobbiesData = this.props.SvishrRedux.stateLookupData.HOBBIES;
                let hobbiesData = this.state.profileData.hobbies.split(',').map(Number);
                if (this.state.hobbiesData.length == hobbiesData.length) {
                    null
                } else {
                    for (let i = 0; i < lookUpHobbiesData.length; i++) {
                        for (let j = 0; j < hobbiesData.length; j++) {
                            if (lookUpHobbiesData[i].id == hobbiesData[j]) {
                                this.state.hobbiesData.push(" " + lookUpHobbiesData[i].name);
                            }
                        }
                    }
                }
                this.setState(this.state);
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
        this.state.pageLoader = false;
        this.setState(this.state);
    }
    // this function used for country api call 
    allCountryData = async () => {
        let countryData = await MiddlewareCheck("getAllCountry", {}, this.props)
        if (countryData) {
            if (countryData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let data = countryData.data;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id === 15) {
                        this.state.countryCode = data[i].id;
                        this.setState(this.state);
                    }
                }
            }
        }
    }
    // this function used for universities api call 
    universityData = async (data) => {
        let reqData = {
            countryId: data
        }
        let universitydata = await MiddlewareCheck("getUniversities", reqData, this.props)
        let university = universitydata.data;
        let tempUniversity = [];
        for (let i = 0; i < university.length; i++) {
            for (let j = 0; j < this.state.profileData.university.length; j++) {
                if (university[i].id == this.state.profileData.university[j]) {
                    tempUniversity.push(" " + university[i].name);
                }
            }
        }
        this.state.universityData = tempUniversity.toString();
        this.setState(this.state);
    }

    // for set initial data 
    onInitialData = async () => {
        this.state.emailText = "";
        this.state.loginType = "";
        this.state.profileData = {};
        this.state.pageLoader = true;
        this.state.genderType = "";
        this.state.hobbiesType = "";
        this.state.countryCode = "";
        this.state.isModalVisible = false;
        this.state.isLoading = false;
        this.state.hobbiesData = [];
        this.state.universityData = "";
        this.setState(this.state);
    }

    // for update the profile
    onUpdateProfile = async (data) => {
        await this.onInitialData();
        await this._load();
    }
    // this function used for navigate to mentee or menor profile setup page 
    _onEdit = async () => {
        let userInfo = await StorageDataModification.userData({}, "get");
        if (userInfo.userInfo.userTypeId == 3) {
            this.props.navigation.push("MenteeProfileSetup", { userTypeData: userInfo.userInfo, type: "profile", updateProfile: (data) => this.onUpdateProfile(data) });
        } else {
            this.props.navigation.push("MentorProfileSetup", { userTypeData: userInfo.userInfo, type: "profile", updateProfile: (data) => this.onUpdateProfile(data) });
        }
    }
    // this function used for toggle switch and discoverable api call 
    toggleSwitch = async () => {
        let userInfo = await StorageDataModification.userData({}, "get");
        let userId = userInfo.userInfo.userId;
        let userTypeId = userInfo.userInfo.userTypeId;
        if (this.state.profileData.discoverable == 2) {
            this.state.profileData.discoverable = 1;
        } else {
            this.state.profileData.discoverable = 2;
        }
        let reqData = {
            userId: userId,
            userTypeId: userTypeId,
            discoverable: this.state.profileData.discoverable
        }
        let responseData = await MiddlewareCheck("updateUserDiscoverable", reqData, this.props)
        if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            await this._load()
            Toaster.ShortCenterToaster(responseData.message)
        } else {
            Toaster.ShortCenterToaster(responseData.message)
        }
    }
    // this function used for open logout modal 
    onOpenLogoutModal = async () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }
    // this is the logout function 
    onLogout = async () => {
        this.setState({ isLoading: true });
        await clearStorage();
        // this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'ChooseJourney' }] }));
        this.props.navigation.push('ChooseJourney')
        this.setState({
            isLoading: false,
            isModalVisible: false
        });
        // this.props.navigation.push('ChooseJourney')




    }
    // this function used for implementation of logout modal section 
    onLogoutModalSec = () => {
        return (
            <LogOutModal
                isVisible={this.state.isModalVisible}
                onBackdropPress={this.onOpenLogoutModal}
                onCloseModal={this.onOpenLogoutModal}
                onLogout={this.onLogout}
                isLoading={this.state.isLoading}

            />
        )
    }
    // this is the delete account function 
    onDeleteAccount = () => {
        Toaster.ShortCenterToaster("Coming soon")
    }
    // this is the terms and condition function 
    onTermCondition = () => {
        WebUriLinking.linkWebBrowserUri("https://www.w3schools.com/html/html_links.asp")
    }
    // this is the share function 
    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Toaster.ShortCenterToaster(error.message)
        }
    }
    // this is the function which is navigate to change password screen 
    onChangePassword = () => {
        this.props.navigation.navigate("ChangePassword");
    }
    // this function used for bio show hide 
    onShowBio = () => {
        this.state.isShow = !this.state.isShow
        this.setState(this.state)
    }
    // this is the main render function 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.onLogoutModalSec()}
                {this.state.pageLoader ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color={Color.COLOR.BLACK.PURE_BLACK} />
                    </View>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.editSec}>
                            <TextComponent text={"Your Profile"} additionalStyles={styles.headerTxt} props={this.props} />
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity style={styles.edit} onPress={() => this._onEdit()} activeOpacity={0.7} >
                                <TextComponent text={"EDIT"} additionalStyles={styles.editTxt} props={this.props} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.profileSec}>
                                <Image source={{ uri: App_uri.IMAGE_VIEW_URI + this.state.profileData.profileImgUrl }} style={styles.profileImg} />
                            </View>
                        </View>
                        {this.state.loginType == "Mentor" ?
                            <View style={styles.discoverableSec}>
                                <TextComponent text="Discoverable" additionalStyles={styles.discoverableTxt} props={this.props} />
                                <View style={styles.switchContainer}>
                                    <Switch
                                        trackColor={{ false: '#979797', true: '#2f807f' }}
                                        thumbColor={this.state.profileData.discoverable == 2 ? '#2f807f' : '#f5dd4b'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => this.toggleSwitch()}
                                        value={this.state.profileData.discoverable == 2 ? false : true}
                                        style={styles.switch}
                                    />
                                </View>
                            </View> :
                            null
                        }
                        <View style={styles.personalInfo}>
                            <TextComponent text={"Personal Information"} additionalStyles={styles.personalInfoTxt} props={this.props} />
                        </View>
                        <View style={{ marginHorizontal: '8%' }}>
                            <View style={styles.profieldFieldSec}>
                                <TextComponent text={"Name"} additionalStyles={styles.fieldTxt} props={this.props} />
                                <View style={{ flex: 1 }} />
                                <TextComponent text={this.state.profileData.name} additionalStyles={styles.fieldValueTxt} props={this.props} />
                            </View>
                            <View style={styles.profieldFieldSec}>
                                <TextComponent text={"Gender"} additionalStyles={styles.fieldTxt} props={this.props} />
                                <View style={{ flex: 1 }} />
                                <TextComponent text={this.state.profileData.gender} additionalStyles={styles.fieldValueTxt} props={this.props} />
                            </View>
                            <View style={styles.profieldFieldSec}>
                                <TextComponent text={"Nationality"} additionalStyles={styles.fieldTxt} props={this.props} />
                                <View style={{ flex: 1 }} />
                                <TextComponent text={this.state.profileData.nationality} additionalStyles={styles.fieldValueTxt} props={this.props} />
                            </View>
                            <View style={{ alignItems: 'flex-end', flexDirection: 'row', marginTop: 15 }}>
                                <TextComponent text={"Interests"} additionalStyles={styles.fieldTxt} props={this.props} />
                                <View style={{ flex: 1 }} />
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <TextComponent text={this.state.hobbiesData.toString()} additionalStyles={styles.fieldValueTxt} props={this.props} />
                                </View>
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <TouchableOpacity onPress={() => this.onShowBio()} activeOpacity={0.9} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TextComponent text={"Bio"} additionalStyles={styles.fieldTxt} props={this.props} />
                                    <View style={{ flex: 1 }} />
                                    <TouchableOpacity onPress={() => this.onShowBio()} activeOpacity={0.9}>
                                        <SvgComponent svgName={"dropdown"} strokeColor={"#2f807f"} height={15} width={15} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                                {
                                    this.state.isShow ?
                                        <View style={{ marginTop: 10 }}>
                                            <TextComponent text={this.state.profileData.userStory} additionalStyles={styles.fieldValueTxt} props={this.props} />
                                        </View> : null
                                }
                            </View>
                        </View>
                        <View style={styles.academicInfo}>
                            <TextComponent text={this.state.loginType == "mentee" ? "Academic Preference" : "Academic Information"} additionalStyles={styles.academicInfoTxt} props={this.props} />
                        </View>
                        <View style={{ marginHorizontal: '8%', }}>
                            <View style={styles.profieldFieldSec}>
                                <TextComponent text={"Country"} additionalStyles={styles.fieldTxt} props={this.props} />
                                <View style={{ flex: 1 }} />
                                <TextComponent text={this.state.profileData.country} additionalStyles={styles.fieldValueTxt} props={this.props} />
                            </View>
                            <View style={styles.profieldFieldSec}>
                                <TextComponent text={"Universities"} additionalStyles={styles.fieldTxt} props={this.props} />
                                <View style={{ flex: 1 }} />
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <TextComponent text={this.state.universityData} additionalStyles={styles.fieldValueTxt} props={this.props} />
                                </View>
                            </View>
                            <View style={styles.profieldFieldSec}>
                                <TextComponent text={"Degree"} additionalStyles={styles.fieldTxt} props={this.props} />
                                <View style={{ flex: 1 }} />
                                <TextComponent text={this.state.profileData.degree} additionalStyles={styles.fieldValueTxt} props={this.props} />
                            </View>
                            <View style={styles.profieldFieldSec}>
                                <TextComponent text={"Field"} additionalStyles={styles.fieldTxt} props={this.props} />
                                <View style={{ flex: 1 }} />
                                <TextComponent text={this.state.profileData.field} additionalStyles={styles.fieldValueTxt} props={this.props} />
                            </View>
                            <View style={styles.profieldFieldSec}>
                                <TextComponent text={this.state.loginType == "mentor" ? "Expected Grad." : "Start Year"} additionalStyles={styles.fieldTxt} props={this.props} />
                                <View style={{ flex: 1 }} />
                                <TextComponent text={this.state.profileData.expectedGraduation} additionalStyles={styles.fieldValueTxt} props={this.props} />
                            </View>
                        </View>
                        <View style={styles.accountInfo}>
                            <TextComponent text={"Account Information"} additionalStyles={styles.accountInfoTxt} props={this.props} />
                        </View>
                        <View style={{ marginHorizontal: '8%' }}>
                            <View style={styles.profieldFieldSec}>
                                <TextComponent text={"Email"} additionalStyles={styles.fieldTxt} props={this.props} />
                                <View style={{ flex: 1 }} />
                                <TextComponent text={this.state.profileData.email} additionalStyles={styles.fieldValueTxt} props={this.props} />
                            </View >
                            <View style={styles.profieldFieldSec}>
                                <TextComponent text={"Password"} additionalStyles={styles.fieldTxt} props={this.props} />
                                <View style={{ flex: 1 }} />
                                <TextComponent text={"*********"} additionalStyles={styles.fieldValueTxt} props={this.props} />
                            </View>
                            <TouchableOpacity activeOpacity={0.9} style={{ marginTop: 15 }} onPress={() => this.onChangePassword()}>
                                <TextComponent text={"Change Password"} additionalStyles={styles.fieldTxt} props={this.props} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} style={{ marginTop: 15 }} onPress={() => this.onShare()}>
                                <TextComponent text={"Share Apps with Friends"} additionalStyles={styles.fieldTxt} props={this.props} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => this.onDeleteAccount()} style={{ marginTop: 15 }}>
                                <TextComponent text={"Delete Account"} additionalStyles={styles.fieldTxt} props={this.props} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => this.onTermCondition()} style={{ marginTop: 15 }}>
                                <TextComponent text={"T&C"} additionalStyles={styles.fieldTxt} props={this.props} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => this.onTermCondition()} style={{ marginTop: 15 }}>
                                <TextComponent text={"Support"} additionalStyles={styles.fieldTxt} props={this.props} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} style={{ marginTop: 15 }} onPress={() => this.onOpenLogoutModal()}>
                                <TextComponent text={"Logout"} additionalStyles={styles.fieldTxt} props={this.props} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 50 }} />
                    </ScrollView>

                )
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
