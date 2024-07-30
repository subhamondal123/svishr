import React, { Component } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, View, Image, ActivityIndicator, Platform, KeyboardAvoidingView } from 'react-native';
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName } from '../../enums';
import { BigTextButton, TextComponent, TextInputBox } from '../../shared';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Header } from '../../pageShared';
import { MiddlewareCheck } from '../../services/middleware';
import { COMMON } from '../../services/constant/commonData';
import { ErrorCode } from '../../services/constant';
import { StorageDataModification, Toaster } from '../../services/common-view-function';
import styles from './Style';


// this is forgot password page 
class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailText: "",
            emialAlertMessage: "",
            forgotLoader: false

        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this._load();
    }

    // this is the first function where set the state data
    _load = async () => {

    }

    // this is back button implement here
    _onBack = () => {
        this.props.navigation.goBack();
    }

    // this is emailsection design implement here
    emailSec = () => {
        // this function used for email onchange
        _emailTextChange = (value) => {
            this.setState({ emailText: value, emialAlertMessage: "" });
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
                    borderRadius={10}
                />
                <TextComponent text={this.state.emialAlertMessage} additionalStyles={styles.emailError} props={this.props} />
            </View>
        )
    }

    // this function use for forgot button
    _onForgotButton = async () => {
        this.state.emailText = this.state.emailText.replace(/\s+/g, '');
        let errorCount = 0;
        let emailMsg = "";
        if (this.state.emailText == null || this.state.emailText == undefined || this.state.emailText == "") {
            errorCount++;
            emailMsg = AlertMessage.MESSAGE.EMAIL.EMAIL_EMPTY;
        }
        this.setState({ emialAlertMessage: emailMsg });
        let reqData = {
            email: this.state.emailText,
            otpType: COMMON.OTP_TYPE.FORGOT_PASSWORD
        }
        if (errorCount === 0) {
            this.setState({ forgotLoader: true });
            let resData = await MiddlewareCheck("forgotPassword", reqData, this.props);
            if (resData) {
                if (resData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.props.navigation.navigate("OtpVerification", { email: this.state.emailText, otpType: "forgotPassword" });
                    this.state.emailText = "";
                    this.setState({ emailText: this.state.emailText });
                } else {
                    Toaster.ShortCenterToaster(resData.message);
                }
            }
            this.setState({ forgotLoader: false });

        }
    }

    // this is main render function to this page 
    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <Header {...this.props} goBack={() => this._onBack()} />
                    <View style={{ marginHorizontal: '6%', marginTop: '10%' }}>
                        <TextComponent text={"Forgot password"} additionalStyles={styles.forgotPassText} props={this.props} />
                        <TextComponent text={"Don’t worry, we will send you reset instruction to the email address associated with the account."} additionalStyles={styles.forgotPassTitleText} props={this.props} />
                        {this.emailSec()}
                        <View style={{ marginHorizontal: '5%', marginTop: '10%' }}>
                            {this.state.forgotLoader ?
                                <ActivityIndicator size={"large"} color={"#348b8a"} /> :
                                <BigTextButton
                                    text={"Send"}
                                    fontFamily={FontFamily.FONTS.OPENSANS.REGULAR}
                                    fontSize={FontSize.SM}
                                    isLinearGradient={this.state.emailText == "" ? false : true}
                                    gradientColors={['#2AE5E5', '#008080',]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    fontColor={this.state.emailText == "" ? "#878787" : "#fff"}
                                    borderRadius={30}
                                    height={50}
                                    onPress={() => this._onForgotButton()}

                                />
                            }

                        </View>
                    </View>
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

    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
