import React, { Component, useRef } from 'react'
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { AlertMessage, Color, Dimension, FontFamily, FontSize } from '../../enums'
import { BigTextButton, TextComponent } from '../../shared'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Header } from '../../pageShared';
import { OtpInput } from 'react-native-otp-entry';
import styles from './Style';
import { COMMON } from '../../services/constant/commonData';
import { MiddlewareCheck } from '../../services/middleware';
import { ErrorCode } from '../../services/constant';
import { StorageDataModification, Toaster } from '../../services/common-view-function';

// this is the otp verification component 
class OtpVerification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: "",
            email: "",
            verifyLoader: false,
            otpErrorMsg: "",
            isTimer: true,
            display: "",
            loginType: ""

        }
        this.timer = this.timer.bind(this);
    }

    // this is a initial function which is call first
    componentDidMount = async () => {

        this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
        let typeData = await StorageDataModification.loginTypeData({}, "get");
        this.setState({ loginType: typeData })
        this.timer(1);
    }
    timer = (minutes) => {
        let seconds = minutes * 60;
        let textSec = '0';
        let statSec = 60;
        const prefix = minutes < 10 ? '0' : '';
        this.state.intervalId = setInterval(() => {
            seconds--;
            if (statSec !== 0) statSec--;
            else statSec = 59;
            if (statSec < 10) {
                textSec = '0' + statSec;
            } else {
                textSec = statSec.toString();
            }
            const display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
            this.setState({ display });
            if (seconds === 0) {
                this.setState({ isTimer: false });
                clearInterval(this.state.intervalId);
            }
        }, 1000);
    }
    //this function used for back button 
    _onBack = () => [
        this.props.navigation.goBack()
    ]

    // this function used for change otp
    onChangeOtp = (text) => {
        this.state.otp = text;
        this.state.otpErrorMsg = "";
        this.setState(this.state);
    }

    // this function used for verify api call
    onVerify = async () => {
        let errorCount = 0;
        let otpMsg = "";
        if (this.state.isTimer) {

            if (this.state.otp == null || this.state.otp == undefined || this.state.otp == "") {
                errorCount++;
                otpMsg = AlertMessage.MESSAGE.OTP.OTP_EMPTY;
            }
            this.setState({ otpErrorMsg: otpMsg });
            if (errorCount === 0) {
                let reqData = {
                    email: this.props.route.params.email,
                    otp: this.state.otp,
                    otpType: this.props.route.params.otpType == "signUp" ? COMMON.OTP_TYPE.SIGN_UP : COMMON.OTP_TYPE.FORGOT_PASSWORD
                }
                this.setState({ verifyLoader: true });
                let resData = await MiddlewareCheck("verifyOtp", reqData, this.props);
                if (resData) {
                    if (resData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        let userData = {
                            userInfo: resData.data
                        }
                        await StorageDataModification.userData(userData, "store")
                        // await StorageDataModification.authData(userData, "store");
                        if (this.props.route.params.otpType == "signUp") {
                            this.props.navigation.navigate("OnBordingScreen", { loginType: this.props.route.params.userData, userTypeId: resData.data });
                            this.setState({ otp: "" });
                        } else {
                            this.props.navigation.navigate("ResetPassword", { loginType: this.props.route.params.userData });
                            this.setState({ otp: "" });
                        }

                    } else {
                        Toaster.ShortCenterToaster(resData.message);
                    }

                }
                this.setState({ verifyLoader: false });
            }
        } else {
            Toaster.ShortCenterToaster("Pleace resend otp !")
        }
    }
    // this is the resend button function 
    onResend = () => {
        if (this.state.loginType == "Mentor") {
            this.props.navigation.navigate("MentorSignUp", { userTypeId: 2 })
        } else if (this.props.route.params.otpType == "forgotPassword") {
            this.props.navigation.navigate("ForgotPassword")
        } else {
            this.props.navigation.navigate("MenteeSignUp", { userTypeId: 3 })
        }

    }
    // this is the main render function to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} goBack={() => this._onBack()} />
                <View style={{ marginHorizontal: '8%', marginTop: 30 }}>
                    <TextComponent text={"Check your mail"} additionalStyles={styles.titleText} props={this.props} />
                    <View style={{ marginTop: 30 }}>
                        <TextComponent text={"We send 4 digit code to"} additionalStyles={styles.sendTitleText} props={this.props} />
                        <TextComponent text={this.props.route.params.email} additionalStyles={styles.mailText} props={this.props} />
                    </View>
                    <View style={{ marginTop: 50 }}>
                        <OtpInput
                            numberOfDigits={4}
                            focusColor="green"
                            focusStickBlinkingDuration={500}
                            onTextChange={(text) => this.onChangeOtp(text)}
                            pinCodeTextStyle={{ color: '#008080' }}
                            theme={{
                                pinCodeContainerStyle: styles.pinCodeContainer,
                                pinCodeTextStyle: styles.pinCodeText,
                            }}
                        />

                        <TextComponent text={this.state.isTimer ? this.state.otpErrorMsg : ""} additionalStyles={styles.errorMsgText} props={this.props} />

                    </View>
                    <View style={{ marginTop: '18%' }}>
                        {this.state.verifyLoader ?
                            <ActivityIndicator size={"large"} color={"#348b8a"} /> :
                            <BigTextButton
                                fontColor={this.state.otp == "" ? "#878787" : "#fff"}
                                fontFamily={FontFamily.FONTS.OPENSANS.REGULAR}
                                fontSize={FontSize.MD}
                                text={"Verify"}
                                isLinearGradient={this.state.otp == "" ? false : true}
                                gradientColors={['#2AE5E5', '#008080',]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                height={50}
                                borderRadius={30}
                                // isDisabled={this.state.isTimer ? false : true}
                                onPress={() => this.onVerify()}
                            />
                        }
                    </View>
                    <View style={styles.resendTextSec}>
                        <TextComponent text={"Didn't receive code? "} additionalStyles={styles.recivedText} props={this.props} />
                        <TouchableOpacity disabled={this.state.isTimer ? true : false} onPress={() => this.onResend()} activeOpacity={0.9}>
                            <TextComponent text={"Resend"} additionalStyles={{ color: this.state.isTimer ? Color.COLOR.GRAY.GRAY_COLOR : '#008080', fontFamily: FontFamily.FONTS.MONTSERRAT.SEMI_BOLD, fontSize: FontSize.XS }} props={this.props} />
                        </TouchableOpacity>
                        <View style={{ width: 20 }} />
                        <TextComponent text={this.state.display} additionalStyles={styles.recivedText} props={this.props} />
                    </View>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(OtpVerification);
