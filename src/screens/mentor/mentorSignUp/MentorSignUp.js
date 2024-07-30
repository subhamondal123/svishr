import React, { Component } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName } from '../../../enums';
import { BigTextButton, CheckBox, TextComponent, TextInputBox } from '../../../shared';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Header } from '../../../pageShared';
import { MiddlewareCheck } from '../../../services/middleware';
import { COMMON } from '../../../services/constant/commonData';
import { ErrorCode } from '../../../services/constant';
import { StorageDataModification, Toaster } from '../../../services/common-view-function';
import { stateLookupData } from '../../../redux/SvishrAction';
import styles from './Style';



// this is mentor account create page
class MentorSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailText: "",
            passwordText: "",
            emailAlertMessage: "",
            passAlertMessage: "",
            registerLoader: false,
            loginType: "",
            userTypeId: this.props.route.params ? this.props.route.params.userTypeId : this.props.route.userTypeId,
            showPassword: false,
            rememberCheck: false,
            emailActive: false,
            passwordActive: false,
            type: this.props.route.params ? this.props.route.params.loginType : this.props.route.loginType,
            hasUnsavedChanges: false
        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
        let LoginType = this.props.SvishrRedux.stateLookupData.LOGIN_TYPE
        for (let i = 0; i < LoginType.length; i++) {
            if (LoginType[i].name == "EMAIL_PASS") {
                this.state.loginType = LoginType[i].name
                this.setState({ loginType: this.state.loginType });
            }
        }
    }

    // this is back button implement here
    _onBack = () => {
        if (this.props.route.params) {
            this.props.navigation.goBack()
        } else {
            this.props.navigation.addListener('beforeRemove', (e) => {
                if (!this.state.hasUnsavedChanges) {
                    return;
                }
                e.preventDefault();
                if (this.state.examStart && !this.state.isAbort) {
                } else {
                    this.props.navigation.dispatch(e.data.action);
                }
            });
        }
    }

    onPassShowHode = () => {
        this.state.showPassword = !this.state.showPassword
        this.setState(this.state)
    }

    validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
// this is the function which is call mentor signUp api
    _onRegister = async () => {
        this.state.emailText = this.state.emailText.replace(/\s+/g, '');
        this.state.passwordText = this.state.passwordText.replace(/\s+/g, '');
        let errorCount = 0;
        let emailMsg = "";
        let passMsg = ""

        if (this.state.emailText == null || this.state.emailText == undefined || this.state.emailText == "") {
            errorCount++;
            emailMsg = AlertMessage.MESSAGE.EMAIL.EMAIL_EMPTY;
        } else if (!this.validateEmail(this.state.emailText)) {
            errorCount++;
            emailMsg = AlertMessage.MESSAGE.EMAIL.EMAIL_INVALID;
        } else if (this.state.passwordText == null || this.state.passwordText == undefined || this.state.passwordText.length == 0) {
            errorCount++;
            passMsg = AlertMessage.MESSAGE.PASSWORD.PASSWORD_EMPTY;
        }
        this.setState({ emailAlertMessage: emailMsg, passAlertMessage: passMsg })
        if (errorCount == 0) {
            let reqData = {
                email: this.state.emailText.toString(),
                otpType: COMMON.OTP_TYPE.SIGN_UP,
                password: this.state.passwordText.toString(),
                loginType: this.state.loginType,
                userTypeId: this.state.userTypeId
            }
            this.setState({ registerLoader: true })
            let responseDta = await MiddlewareCheck("signUp", reqData, this.props)
            if (responseDta) {
                if (responseDta.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    // await StorageDataModification.authData(responseDta.data, "Store")
                    await StorageDataModification.loginTypeData("Mentor", "store")
                    this.props.navigation.navigate("OtpVerification", { email: this.state.emailText, otpType: "signUp", userTypeId: this.state.userTypeId, userData: "Mentor" })
                    this.setState({ emailText: "", passwordText: "" });
                } else {
                    Toaster.ShortCenterToaster(responseDta.message)
                }
            }
        }
        this.setState({ registerLoader: false })
    }

    // this is emailsection design implement here
    emailSec = () => {
        // this function used for email onchange
        const _emailTextChange = (value) => {
            this.setState({ emailText: value, emailAlertMessage: "" });
        }
        const emailInputFocus = () => {
            this.state.emailActive = true
            this.state.passwordActive = false
            this.setState(this.state)

        }
        const onEmailBlur = () => {
            this.state.emailActive = true
            this.state.passwordActive = false
            this.setState(this.state)
        }
        return (
            <View>
                <TextComponent text={"Email"} additionalStyles={styles.labelText} props={this.props} />
                <TextInputBox
                    placeholder="Email"
                    value={this.state.emailText}
                    onChangeText={(value) => _emailTextChange(value)}
                    isLeftIcon={true}
                    leftIcon={this.state.emailAlertMessage ? ImageName.ERROR_EMAIL : ImageName.EMAIL}
                    height={50}
                    additionalBoxStyle={{ height: 50, marginTop: 10 }}
                    isActive={this.state.emailActive}
                    onFocus={() => emailInputFocus()}
                    onBlur={() => onEmailBlur()}
                    borderRadius={10}
                />
                <TextComponent text={this.state.emailAlertMessage} additionalStyles={styles.errorMsgText} props={this.props} />
            </View>
        )
    }

    // this is password design implement
    passwordSec = () => {
        // this function used for password onchange
        const _passTextChange = (value) => {
            this.setState({ passwordText: value, passAlertMessage: "" });
        }
        const passInputFocus = () => {
            this.state.passwordActive = true
            this.state.emailActive = false
            this.setState(this.state);
        }
        const onPassBlur = () => {
            this.state.passwordActive = true
            this.state.emailActive = false
            this.setState(this.state);
        }
        return (
            <View>
                <TextComponent text={"Password"} additionalStyles={styles.labelText} props={this.props} />
                <TextInputBox
                    placeholder="Password"
                    value={this.state.passwordText}
                    secureTextEntry={!this.state.showPassword}
                    onChangeText={(value) => _passTextChange(value)}
                    isLeftIcon={true}
                    leftIcon={ImageName.LOCK_IMAGE}
                    isRightIcon={true}
                    rightIcon={this.state.showPassword ? ImageName.EYE_IMAGE : ImageName.EYE_HIDE}
                    height={50}
                    additionalBoxStyle={{ height: 50, marginTop: 10 }}
                    onPressRightIcon={() => this.onPassShowHode()}
                    isActive={this.state.passwordActive}
                    onFocus={() => passInputFocus()}
                    onBlur={() => onPassBlur()}
                    borderRadius={10}
                />
                <TextComponent text={this.state.passAlertMessage} additionalStyles={styles.errorMsgText} props={this.props} />

            </View>
        )
    }

    // this is register button design implement 
    registerButtonSec = () => {
        return (
            <View style={{ marginTop: 50, marginHorizontal: '4%' }}>
                {this.state.registerLoader ?
                    <View style={{}}>
                        <ActivityIndicator size={"large"} color={"#348b8a"} />
                    </View> :
                    <BigTextButton
                        text={"Register"}
                        isLinearGradient={this.state.emailText == "" && this.state.passwordText == "" ? false : true}
                        gradientColors={['#2AE5E5', '#008080',]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        borderRadius={30}
                        fontFamily={FontFamily.FONTS.MONTSERRAT.REGULAR}
                        fontSize={FontSize.SM}
                        onPress={() => this._onRegister()}
                        height={50}
                    />
                }
            </View>
        )
    }
// this is the function which is navigate to login screen 
    _onLogin = (type) => {
        this.props.navigation.push("LoginPage", { loginType: "Mentor" })
    }
    onRememberCheck = () => {
        this.state.rememberCheck = !this.state.rememberCheck
        this.setState(this.state);
    }
    // this is the main render to this page 
    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <SafeAreaView style={styles.container}>
                    <Header {...this.props} goBack={() => this._onBack()} />
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <View style={{ marginHorizontal: '6%', }}>
                            <TextComponent text={"Create Mentor Account"} additionalStyles={styles.titleText} props={this.props} />
                            {this.emailSec()}
                            {this.passwordSec()}
                            {this.registerButtonSec()}
                            <View style={styles.loginSec}>
                                <TextComponent text={"Already have an account?"} additionalStyles={styles.alreadyAccText} props={this.props} />
                                <TouchableOpacity onPress={() => this._onLogin("Login")} activeOpacity={0.7}>
                                    <TextComponent text={" Login"} additionalStyles={styles.loginText} props={this.props} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.mentorImgSec}>
                            <Image source={ImageName.MENTOR_LOGIN_IMAGE} style={{ height: 300, resizeMode: 'contain' }} />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
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

export default connect(mapStateToProps, mapDispatchToProps)(MentorSignUp);
