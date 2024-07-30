import React, { Component } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../enums';
import { BigTextButton, TextComponent, TextInputBox } from '../../../../shared';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MiddlewareCheck } from '../../../../services/middleware';
import { ErrorCode } from '../../../../services/constant';
import { StorageDataModification, Toaster } from '../../../../services/common-view-function';
import { CommonActions } from '@react-navigation/native';
import styles from './Style';
import { GoogleSignin, isErrorWithCode } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager, Profile } from 'react-native-fbsdk-next';

// this is mentor login page
class MenteeLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailText: "",
            passwordText: "",
            emialAlertMessage: "",
            passAlertMessage: "",
            loginLoader: false,
            showPassword: false,
            emailActive: false,
            passwordActive: false,
            type: this.props.route.params ? this.props.route.params.loginType : this.props.route.loginType,
            userData: null
        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        console.log("sadasd")
        GoogleSignin.configure({
            webClientId: '769666324649-a1pi6gpelj68siks549ki7qt8e2t22in.apps.googleusercontent.com'
        })
        this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
    }
    // this function used for navigate to forgot password screen 
    _onForgetPass = () => {
        this.props.navigation.navigate("ForgotPassword", { loginType: this.props.userType });
    }
    // this function used for navigate to mentee sign up screen 
    _onRegister = () => {
        this.props.navigation.push("MenteeSignUp", { userTypeId: 3, loginType: this.props.userType });
    }
    // this function used for password show hide 
    onPassShowHode = () => {
        this.state.showPassword = !this.state.showPassword;
        this.setState(this.state);
    }
    // this function used for email validation 
    validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    // this is the login implementation and api call 
    onLogin = async () => {
        let typeData = await StorageDataModification.loginTypeData({}, "get");
        this.state.emailText = this.state.emailText.replace(/\s+/g, '');
        this.state.passwordText = this.state.passwordText.replace(/\s+/g, '');
        let errorCount = 0;
        let emailMsg = "";
        let passMsg = "";
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
        this.setState({ emialAlertMessage: emailMsg, passAlertMessage: passMsg })

        if (errorCount === 0) {
            let reqData = {
                email: this.state.emailText.toString(),
                password: this.state.passwordText.toString(),
                userTypeId: 3
            }
            this.setState({ loginLoader: true });
            let responseData = await MiddlewareCheck("signIn", reqData, this.props);
            if (responseData) {
                if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    await StorageDataModification.userData(responseData.data, "store")
                    await StorageDataModification.loginTypeData("Mentee", "store");
                    if (responseData.data.userInfo.status == 0) {
                        // this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'OnBordingScreen', type: this.state.type, loginData: responseData.data }] }));
                        this.props.navigation.push('OnBordingScreen', { type: this.state.type, loginData: responseData.data })
                    } else if (responseData.data.userInfo.status == 1 && typeData == "Mentor") {
                        await StorageDataModification.SetupTypeData("SignUp", "store");
                        // this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'MentorProfileSetup', type: this.state.type, loginData: responseData.data }] }));
                        this.props.navigation.push('MentorProfileSetup', { type: this.state.type, loginData: responseData.data })
                    } else if (responseData.data.userInfo.status == 1 && typeData == "Mentee") {
                        await StorageDataModification.SetupTypeData("SignUp", "store");
                        // this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'MenteeProfileSetup', type: this.state.type, loginData: responseData.data }] }));
                        this.props.navigation.push('MenteeProfileSetup', { type: this.state.type, loginData: responseData.data })
                    } else {
                        await StorageDataModification.authData(responseData.data, "store");
                        // this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'HomePage', loginType: this.state.type, loginData: responseData.data }] }));
                        this.props.navigation.push('HomePage', { loginType: this.state.type, loginData: responseData.data })
                    }
                } else {
                    Toaster.ShortCenterToaster(responseData.message);
                }
            }
        }
        this.setState({ loginLoader: false });
    }

    // this is emailsection design implement here
    emailSec = () => {
        // this function used for email onchange
        const _emailTextChange = (value) => {
            this.setState({ emailText: value, emialAlertMessage: "" });
        }
        const emailInputFocus = () => {
            this.state.emailActive = true;
            this.state.passwordActive = false;
            this.setState(this.state);

        }
        const onEmailBlur = () => {
            this.state.emailActive = true;
            this.state.passwordActive = false;
            this.setState(this.state);
        }
        return (
            <View>
                <TextComponent text={"Email"} additionalStyles={styles.emailText} props={this.props} />
                <TextInputBox
                    placeholder="Email"
                    value={this.state.emailText}
                    onChangeText={(value) => _emailTextChange(value)}
                    isLeftIcon={true}
                    leftIcon={this.state.emialAlertMessage ? ImageName.ERROR_EMAIL : ImageName.EMAIL}
                    height={50}
                    additionalBoxStyle={{ height: 50, marginTop: 10 }}
                    isActive={this.state.emailActive}
                    onFocus={() => emailInputFocus()}
                    onBlur={() => onEmailBlur()}
                    borderRadius={10}
                />
                <TextComponent text={this.state.emialAlertMessage} additionalStyles={styles.emailErrorText} props={this.props} />

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
            this.state.passwordActive = true;
            this.state.emailActive = false;
            this.setState(this.state);
        }
        const onPassBlur = () => {
            this.state.passwordActive = true;
            this.state.emailActive = false;
            this.setState(this.state);
        }
        return (
            <View>
                <TextComponent text={"Password"} additionalStyles={styles.passwordText} props={this.props} />
                <TextInputBox
                    placeholder="Password"
                    secureTextEntry={!this.state.showPassword}
                    value={this.state.passwordText}
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
                <TextComponent text={this.state.passAlertMessage} additionalStyles={styles.passwordErrorText} props={this.props} />

            </View>
        )
    }


    onGoogleLogin = async () => {
        console.log("dsfs")
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("userInfooo---", userInfo)
            this.setState({ userData: userInfo, error: undefined });
        } catch (error) {
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.SIGN_IN_CANCELLED:
                        // user cancelled the login flow
                        break;
                    case statusCodes.IN_PROGRESS:
                        // operation (eg. sign in) already in progress
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        // play services not available or outdated
                        break;
                    default:
                    // some other error happened
                }
            } else {
                // an error that's not related to google sign in occurred
            }
        }

    }
    onFacebookButtonPress = async () => {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        console.log("resulttt====", result)

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();

        const profile = Profile.getCurrentProfile()
        console.log("profile===", profile)

        if (!data) {
            console.log("dattaa-->", data)
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        // const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        // return auth().signInWithCredential(facebookCredential);
    }

    onFBLogin = async () => {
        let data = await this.onFacebookButtonPress();
        console.log("datata---", data)

    }
    // this is the main render to this page 
    render() {
        return (
            <View style={styles.containStyle}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{ marginBottom: "38%" }}>
                        <View style={{ marginHorizontal: '6%', marginTop: 20 }}>
                            {this.emailSec()}
                            {this.passwordSec()}
                            {this.state.loginLoader ?
                                <View>
                                    <ActivityIndicator size={"large"} color={"#348b8a"} />
                                </View> :
                                <View style={{ marginTop: 30, marginHorizontal: '4%' }}>
                                    <BigTextButton
                                        fontColor={this.state.emailText == "" && this.state.passwordText == "" ? "#878787" : "#fff"}
                                        fontFamily={FontFamily.FONTS.OPENSANS.REGULAR}
                                        fontSize={FontSize.SM}
                                        text={"Login"}
                                        borderRadius={30}
                                        isLinearGradient={this.state.emailText == "" && this.state.passwordText == "" ? false : true}
                                        gradientColors={['#2AE5E5', '#008080',]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        height={50}
                                        onPress={() => this.onLogin()}
                                    />
                                </View>
                            }
                            <TouchableOpacity style={{ marginTop: 25, alignItems: 'center' }} onPress={() => this._onForgetPass()} activeOpacity={0.7}>
                                <TextComponent text={"Forgot your password?"} additionalStyles={styles.forgotPassText} props={this.props} />
                            </TouchableOpacity>
                            <View style={styles.orTextSec}>
                                <View style={styles.singleView} />
                                <TextComponent text={" Or "} additionalStyles={styles.orText} props={this.props} />
                                <View style={styles.singleView} />
                            </View>
                            <View style={styles.googleLoginSec}>
                                <TouchableOpacity style={{}} onPress={() => this.onGoogleLogin()}>
                                    <Image source={ImageName.GOOGLE} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                </TouchableOpacity>
                                <View style={{ flex: 0.1 }} />
                                <Image source={ImageName.LINKEDIN_IMAGE} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                <View style={{ flex: 0.1 }} />
                                <TouchableOpacity style={{}} onPress={() => this.onFBLogin()}>
                                    <Image source={ImageName.FACEBOOK_IMAGE} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.registerSec}>
                                <TextComponent text={"Don't have an account?"} additionalStyles={styles.registerQueteText} props={this.props} />
                                <TouchableOpacity onPress={() => this._onRegister()} activeOpacity={0.7}>
                                    <TextComponent text={" Register"} additionalStyles={styles.registerText} props={this.props} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.menteeLoginImgSec}>
                            <Image source={ImageName.MENTEE_LOGIN_IMAGE} style={{ height: 250, resizeMode: 'contain' }} />
                        </View>
                    </View>
                </ScrollView>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenteeLogin);


