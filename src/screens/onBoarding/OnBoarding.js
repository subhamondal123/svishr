
import React, { Component } from 'react';
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../enums';
import { BigTextButton, TextComponent, TextInputBox, WarningModal } from '../../shared';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from './Style';
import { Header } from '../../pageShared';
import { StorageDataModification, Toaster } from '../../services/common-view-function';
import { MiddlewareCheck } from '../../services/middleware';
import { ErrorCode } from '../../services/constant';
import { modOnBoardingData } from './Function';
import { CommonActions } from '@react-navigation/native';

// this is onBoarding page
class OnBordingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onboardingData: [],
            currentIndex: 0,
            userTypeData: {},
            dataObj: {},
            pageLoader: true,
            isVisible: false,
            type: "",
            hasUnsavedChanges: true,
            nextButtonLoader: false
        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {

        this.props.navigation.addListener('beforeRemove', (e) => {
            if (!this.state.hasUnsavedChanges) {
                // If we don't have unsaved changes, then we don't need to do anything
                return;
            }

            // Prevent default behavior of leaving the screen
            e.preventDefault();

            // Prompt the user before leaving the screen
        })



        let typeData = await StorageDataModification.loginTypeData({}, "get");
        let userData = await StorageDataModification.userData({}, "get")
        this.state.userTypeData = userData;
        this.state.type = typeData;
        this.setState(this.state);

        await this._load();
    }
    // componentWillUnmount = () => {
    //     if (this.unsubscribe) {
    //         this.unsubscribe();
    //     }
    // }
    // this is back button implement here
    _onBack = () => {
        // this.props.navigation.goBack();
        this.setState({ isVisible: !this.state.isVisible })
    }

    // this is the first function where set the state data
    _load = async () => {
        let reqData = {
            contentType: "ONBOARDING",
            userTypeId: this.state.userTypeData.userInfo.userTypeId
        }
        let responseData = await MiddlewareCheck("getContent", reqData, this.props);
        if (responseData) {
            if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let arrayData = modOnBoardingData(responseData.data.ONBOARDING);
                this.state.onboardingData = arrayData;
                // this.setState({ onboardingData: arrayData });
                this.state.dataObj = this.state.onboardingData[this.state.currentIndex];
                // this.setState({ dataObj: this.state.dataObj });
                this.setState(this.state);
            }
        }
        this.setState({ pageLoader: false });
    }

    // this function used for next button
    _onNextButton = async () => {
        this.state.currentIndex = this.state.currentIndex + 1;
        this.state.dataObj = this.state.onboardingData[this.state.currentIndex];
        this.setState(this.state);
        if (this.state.currentIndex == this.state.onboardingData.length) {
            this.setState({ nextButtonLoader: true })
            let reqData = {
                userId: this.state.userTypeData.userInfo.userId,
                userTypeId: this.state.userTypeData.userInfo.userTypeId
            }
            let responseData = await MiddlewareCheck("completeOnboarding", reqData, this.props)
            if (responseData) {
                if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    await StorageDataModification.SetupTypeData("SignUp", "store");
                    if (this.state.type == "Mentee") {
                        this.props.navigation.navigate("MenteeProfileSetup", { loginType: this.state.type, userTypeData: this.state.userTypeData, type: "signUp" });
                    } else {
                        this.props.navigation.navigate("MentorProfileSetup", { loginType: this.state.type, userTypeData: this.state.userTypeData, type: "signUp" });
                    }
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ nextButtonLoader: false })

        }
    };
    // this function used for skip
    _onSkip = async () => {
        let reqData = {
            userId: this.state.userTypeData.userInfo.userId,
            userTypeId: this.state.userTypeData.userInfo.userTypeId
        }
        let responseData = await MiddlewareCheck("completeOnboarding", reqData, this.props)
        if (responseData) {
            if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await StorageDataModification.SetupTypeData("SignUp", "store");
                if (this.state.type == "Mentee") {
                    this.props.navigation.navigate("MenteeProfileSetup", { loginType: this.state.type, userTypeData: this.state.userTypeData, type: "signUp" });
                } else {
                    this.props.navigation.navigate("MentorProfileSetup", { loginType: this.state.type, userTypeData: this.state.userTypeData, type: "signUp" });
                }
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    // this is the main render to this page 
    render() {
        if (this.state.onboardingData != null || this.state.onboardingData != undefined || this.state.onboardingData.length > 0) {
            return (
                <SafeAreaView style={styles.container}>
                    {/* {this.warningModalSec()} */}
                    <Header {...this.props} goBack={() => this._onBack()} />
                    {this.state.pageLoader ?
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <ActivityIndicator size={"large"} color={"#358d8c"} />
                        </View> :
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            <View style={{ marginHorizontal: '6%', marginTop: 35, marginBottom: 25 }}>
                                <View style={{ backgroundColor: '#e68e8e', height: 350, width: "100%" }} />
                                <View style={{ justifyContent: 'center', marginTop: 20 }}>
                                    <TextComponent text={this.state.dataObj === undefined ? "" : this.state.dataObj.contentTitle} additionalStyles={styles.titleText} props={this.props} />
                                    <TextComponent text={this.state.dataObj === undefined ? "" : this.state.dataObj.contentBody} additionalStyles={styles.titleSummeryText} props={this.props} />
                                </View>
                                <View style={{ marginTop: 50, marginHorizontal: '4%' }}>
                                    {
                                        this.state.nextButtonLoader ?
                                            <View>
                                                <ActivityIndicator size={"large"} color={"#348b8a"} />
                                            </View>
                                            :
                                            <BigTextButton
                                                text="Next"
                                                height={50}
                                                onPress={() => this._onNextButton()}
                                                borderRadius={70}
                                                isLinearGradient={true}
                                                gradientColors={["#2AE5E5", "#008080"]}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                            />
                                    }
                                </View>
                                {this.state.currentIndex == this.state.onboardingData.length - 1 ?
                                    null :
                                    <TouchableOpacity style={styles.skipSec} onPress={() => this._onSkip()} activeOpacity={0.7}>
                                        <Text style={{ color: "#008080", fontSize: FontSize.MD }}>skip</Text>
                                    </TouchableOpacity>
                                }

                            </View>
                        </ScrollView>

                    }
                </SafeAreaView>
            )
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(OnBordingScreen);




