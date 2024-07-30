import React, { Component } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, View, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
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
class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordText: "",
            passwordAlertMessage: "",
            resetLoader: false,
            confirmPasswordText: "",
            confirmPasswordAlertMessage: "",
            showPasswordNew: false,
            showPasswordConfirm: false,
            newPasswordActive: false,
            confirmPasswordActive: false

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
    // this is confirm password show hide 
    onConfirmPassShowHode = () => {
        this.state.showPasswordConfirm = !this.state.showPasswordConfirm
        this.setState(this.state)
    }
    // this is new password show hide 
    onNewPassShowHode = () => {
        this.state.showPasswordNew = !this.state.showPasswordNew
        this.setState(this.state)
    }
    // this is emailsection design implement here
    passwordSec = () => {
        // this function used for email onchange
        const _passwordTextChange = (value) => {
            this.setState({ passwordText: value, passwordAlertMessage: "" });
        }
        const newPassInputFocus = () => {
            this.state.newPasswordActive = true
            this.state.confirmPasswordActive = false
            this.setState(this.state);
        }
        const onNewPassBlur = () => {
            this.state.newPasswordActive = true
            this.state.confirmPasswordActive = false
            this.setState(this.state);
        }
        ResetPassword
        return (
            <View style={{ marginTop: 10 }}>
                <TextComponent text={"New Password"} additionalStyles={styles.labelText} props={this.props} />
                <TextInputBox
                    secureTextEntry={!this.state.showPasswordNew}
                    placeholder="Enter new password"
                    value={this.state.passwordText}
                    onChangeText={(value) => _passwordTextChange(value)}
                    isLeftIcon={false}
                    height={50}
                    additionalBoxStyle={{ height: 50, marginTop: 10 }}
                    borderRadius={10}
                    isRightIcon={true}
                    rightIcon={this.state.showPasswordNew ? ImageName.EYE_IMAGE : ImageName.EYE_HIDE}
                    onPressRightIcon={() => this.onNewPassShowHode()}
                    isActive={this.state.newPasswordActive}
                    onFocus={() => newPassInputFocus()}
                    onBlur={() => onNewPassBlur()}

                />
                <TextComponent text={this.state.passwordAlertMessage} additionalStyles={styles.errorMsgText} props={this.props} />
            </View>
        )
    }
    // this function used for design and implementation of confirm password section 
    confirmPasswordSec = () => {
        // this function used for email onchange
        const _confirmPasswordTextChange = (value) => {
            this.setState({ confirmPasswordText: value, confirmPasswordAlertMessage: "" });
        }
        const confirmPassInputFocus = () => {
            this.state.confirmPasswordActive = true
            this.state.newPasswordActive = false
            this.setState(this.state)
        }

        const onConfirmPassBlur = () => {
            this.state.confirmPasswordActive = true
            this.state.newPasswordActive = false
            this.setState(this.state)
        }
        return (
            <View style={{ marginTop: 10 }}>
                <TextComponent text={"Confirm Password"} additionalStyles={styles.labelText} props={this.props} />
                <TextInputBox
                    secureTextEntry={!this.state.showPasswordConfirm}
                    placeholder="Enter confirm password"
                    value={this.state.confirmPasswordText}
                    onChangeText={(value) => _confirmPasswordTextChange(value)}
                    isLeftIcon={false}
                    height={50}
                    additionalBoxStyle={{ height: 50, marginTop: 10 }}
                    borderRadius={10}
                    isRightIcon={true}
                    rightIcon={this.state.showPasswordConfirm ? ImageName.EYE_IMAGE : ImageName.EYE_HIDE}
                    onPressRightIcon={() => this.onConfirmPassShowHode()}
                    isActive={this.state.confirmPasswordActive}
                    onFocus={() => confirmPassInputFocus()}
                    onBlur={() => onConfirmPassBlur()}

                />
                <TextComponent text={this.state.confirmPasswordAlertMessage} additionalStyles={styles.errorMsgText} props={this.props} />
            </View>
        )
    }

    // this function use for reset password
    _onResetPassword = async () => {
        let userInfo = await StorageDataModification.userData({}, "get");
        this.state.passwordText = this.state.passwordText.replace(/\s+/g, '');
        let errorCount = 0;
        let newPasswordMsg = "";
        let confirmPassMsg = ""
        if (this.state.passwordText == null || this.state.passwordText == undefined || this.state.passwordText == "") {
            errorCount++;
            newPasswordMsg = AlertMessage.MESSAGE.PASSWORD.NEW_PASSWORD_EMPTY;
        } else if (this.state.confirmPasswordText == null || this.state.confirmPasswordText == undefined || this.state.confirmPasswordText == "") {
            errorCount++;
            confirmPassMsg = AlertMessage.MESSAGE.PASSWORD.CONFIRM_PASSWORD_EMPTY;
        } else if (this.state.passwordText !== this.state.confirmPasswordText) {
            errorCount++;
            confirmPassMsg = AlertMessage.MESSAGE.PASSWORD.NEW_PASSWORD_CONFIRM_PASSWORD_MISMATCH;
        }
        this.setState({ passwordAlertMessage: newPasswordMsg, confirmPasswordAlertMessage: confirmPassMsg });

        if (errorCount == 0) {
            let reqData = {
                userId: userInfo.userInfo.userId,
                userTypeId: userInfo.userInfo.userTypeId,
                password: this.state.confirmPasswordText.trim()
            }
            this.setState({ resetLoader: true })
            let responseData = await MiddlewareCheck("resetPassword", reqData, this.props);
            if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.props.navigation.navigate("LoginPage", { loginType: this.props.route.params.userData });
            }

        }
        this.setState({ resetLoader: false })

    }
    // this is the main render to this page 
    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <SafeAreaView >
                    <Header {...this.props} goBack={() => this._onBack()} />
                    <ScrollView>
                        <View style={{ marginHorizontal: '6%', marginTop: '10%' }}>
                            <TextComponent text={"Reset password"} additionalStyles={styles.titleText} props={this.props} />
                            <View style={{ marginTop: "15%" }}>
                                {this.passwordSec()}
                                {this.confirmPasswordSec()}
                            </View>

                            <View style={{ marginHorizontal: '5%', marginTop: '10%' }}>
                                {this.state.resetLoader ?
                                    <ActivityIndicator size={"large"} color={"#348b8a"} /> :
                                    <BigTextButton
                                        text={"Reset Password"}
                                        fontFamily={FontFamily.FONTS.OPENSANS.REGULAR}
                                        fontSize={FontSize.SM}
                                        isLinearGradient={this.state.passwordText == "" ? false : true}
                                        gradientColors={['#2AE5E5', '#008080',]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        fontColor={this.state.passwordText == "" ? "#878787" : "#fff"}
                                        borderRadius={30}
                                        height={50}
                                        onPress={() => this._onResetPassword()}

                                    />
                                }

                            </View>
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

    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
