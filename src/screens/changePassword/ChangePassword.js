import React, { Component } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, View, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName } from '../../enums';
import { BigTextButton, TextComponent, TextInputBox, WarningModal } from '../../shared';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Header } from '../../pageShared';
import { MiddlewareCheck } from '../../services/middleware';
import { COMMON } from '../../services/constant/commonData';
import { ErrorCode } from '../../services/constant';
import { StorageDataModification, Toaster } from '../../services/common-view-function';
import styles from './Style';
import { CommonActions } from '@react-navigation/native';
import { clearStorage } from '../../services/async-storage';


// this is forgot password page 
class ChangePassword extends React.Component {
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
            confirmPasswordActive: false,
            currentPasswordText: "",
            currentPasswordAlertMessage: "",
            currentPasswordActive: false,
            showPasswordCurrent: false,
            isVisible: false,
            isOk: false,
            isLoading: false,
            userData: {},
            type: ""

        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
        let typeData = await StorageDataModification.loginTypeData({}, "get");
        let userInfo = await StorageDataModification.authData({}, "get");
        this.state.userData = userInfo;
        this.state.type = typeData;
        this.setState(this.state)
    }

    // this is back button implement here
    _onBack = () => {
        this.props.navigation.goBack();
    }
    // this is confirm password show hide function
    onConfirmPassShowHode = () => {
        this.state.showPasswordConfirm = !this.state.showPasswordConfirm;
        this.setState(this.state);
    }
    // this is new password show hide function 
    onNewPassShowHode = () => {
        this.state.showPasswordNew = !this.state.showPasswordNew;
        this.setState(this.state);
    }
    // this is current password show hide function 
    onCurrentPassShowHode = () => {
        this.state.showPasswordCurrent = !this.state.showPasswordCurrent;
        this.setState(this.state);
    }
    // this is current password design implementation section 
    currentPasswordSec = () => {
        const _currentPasswordTextChange = (value) => {
            this.setState({ currentPasswordText: value, currentPasswordAlertMessage: "" });
        }
        const currentPassInputFocus = () => {
            this.state.currentPasswordActive = true;
            this.state.newPasswordActive = false;
            this.state.confirmPasswordActive = false;
            this.setState(this.state);
        }
        const onCurrentPassBlur = () => {
            this.state.currentPasswordActive = true;
            this.state.newPasswordActive = false;
            this.state.confirmPasswordActive = false;
            this.setState(this.state);
        }
        return (
            <View style={{ marginTop: 5 }}>
                <TextComponent text={"Current Password"} additionalStyles={styles.labelText} props={this.props} />
                <TextInputBox
                    secureTextEntry={!this.state.showPasswordCurrent}
                    placeholder="Enter current password"
                    value={this.state.currentPasswordText}
                    onChangeText={(value) => _currentPasswordTextChange(value)}
                    isLeftIcon={false}
                    height={50}
                    additionalBoxStyle={{ height: 50, marginTop: 10 }}
                    borderRadius={10}
                    isRightIcon={true}
                    rightIcon={this.state.showPasswordCurrent ? ImageName.EYE_IMAGE : ImageName.EYE_HIDE}
                    onPressRightIcon={() => this.onCurrentPassShowHode()}
                    isActive={this.state.currentPasswordActive}
                    onFocus={() => currentPassInputFocus()}
                    onBlur={() => onCurrentPassBlur()}

                />
                <TextComponent text={this.state.currentPasswordAlertMessage} additionalStyles={styles.errorText} props={this.props} />
            </View>
        )
    }
    // this is emailsection design implement here
    passwordSec = () => {
        // this function used for email onchange
        const _passwordTextChange = (value) => {
            this.setState({ passwordText: value, passwordAlertMessage: "" });
        }
        const newPassInputFocus = () => {
            this.state.newPasswordActive = true;
            this.state.currentPasswordActive = false;
            this.state.confirmPasswordActive = false;
            this.setState(this.state);
        }
        const onNewPassBlur = () => {
            this.state.newPasswordActive = true;
            this.state.currentPasswordActive = false;
            this.state.confirmPasswordActive = false;
            this.setState(this.state);
        }

        return (
            <View style={{ marginTop: 5 }}>
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
                <TextComponent text={this.state.passwordAlertMessage} additionalStyles={styles.errorText} props={this.props} />
            </View>
        )
    }
    // this is confirm password design and implementation section 
    confirmPasswordSec = () => {
        // this function used for email onchange
        const _confirmPasswordTextChange = (value) => {
            this.setState({ confirmPasswordText: value, confirmPasswordAlertMessage: "" });
        }
        const confirmPassInputFocus = () => {
            this.state.confirmPasswordActive = true;
            this.state.newPasswordActive = false;
            this.setState(this.state);
        }

        const onConfirmPassBlur = () => {
            this.state.confirmPasswordActive = true;
            this.state.newPasswordActive = false;
            this.setState(this.state);
        }
        return (
            <View style={{ marginTop: 5 }}>
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
                <TextComponent text={this.state.confirmPasswordAlertMessage} additionalStyles={styles.errorText} props={this.props} />
            </View>
        )
    }

    // this function use for reset password
    _onChangePassword = async () => {
        let userInfo = await StorageDataModification.authData({}, "get");
        this.state.currentPasswordText = this.state.currentPasswordText.replace(/\s+/g, '');
        this.state.passwordText = this.state.passwordText.replace(/\s+/g, '');
        this.state.confirmPasswordText = this.state.confirmPasswordText.replace(/\s+/g, '');
        let errorCount = 0;
        let currentPasswordMsg = "";
        let newPasswordMsg = "";
        let confirmPassMsg = "";
        if (this.state.currentPasswordText == null || this.state.currentPasswordText == undefined || this.state.currentPasswordText == "") {
            errorCount++;
            currentPasswordMsg = AlertMessage.MESSAGE.PASSWORD.CURRENT_PASSWORD_EMPTY;
        } else if (this.state.passwordText == null || this.state.passwordText == undefined || this.state.passwordText == "") {
            errorCount++;
            newPasswordMsg = AlertMessage.MESSAGE.PASSWORD.NEW_PASSWORD_EMPTY;
        } else if (this.state.currentPasswordText === this.state.passwordText) {
            errorCount++;
            newPasswordMsg = AlertMessage.MESSAGE.PASSWORD.PASSWORD_NOT_SAME_AS_CURRENT;
        } else if (this.state.confirmPasswordText == null || this.state.confirmPasswordText == undefined || this.state.confirmPasswordText == "") {
            errorCount++;
            confirmPassMsg = AlertMessage.MESSAGE.PASSWORD.CONFIRM_PASSWORD_EMPTY;
        } else if (this.state.passwordText !== this.state.confirmPasswordText) {
            errorCount++;
            confirmPassMsg = AlertMessage.MESSAGE.PASSWORD.NEW_PASSWORD_CONFIRM_PASSWORD_MISMATCH;
        }
        this.setState({ passwordAlertMessage: newPasswordMsg, confirmPasswordAlertMessage: confirmPassMsg, currentPasswordAlertMessage: currentPasswordMsg });

        if (errorCount == 0) {
            this.setState({ isVisible: true })
        }
        this.setState({ resetLoader: false })

    }
    // this function used for modal visibal 
    onOk = () => {
        this.state.isVisible = !this.state.isVisible

        this.setState(this.state)
    }
    // this is the function which is calling change password api 
    onChangeOk = async () => {
        this.setState({ isLoading: true })
        let reqData = {
            userId: this.state.userData.userInfo.userId,
            userTypeId: this.state.userData.userInfo.userTypeId,
            oldPassword: this.state.currentPasswordText.trim(),
            newPassword: this.state.confirmPasswordText.trim()
        }
        this.setState({ resetLoader: true })
        let responseData = await MiddlewareCheck("changePassword", reqData, this.props)
        if (responseData.data.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            // this.props.navigation.navigate("LoginPage", { loginType: this.state.type });
            await clearStorage();
            this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'LoginPage', loginType: this.state.type }] }));

        } else {
            Toaster.ShortCenterToaster(responseData.message)

        }
        this.setState({
            isLoading: false,
            isVisible: false
        })
    }
    // this is the warning modal section 
    warningModalSec = () => {
        return (
            <WarningModal
                isVisible={this.state.isVisible}
                onBackdropPress={this.onOk}
                onCloseModal={this.onOk}
                onOK={this.onChangeOk}
                warningHeaderText={"Are you sure change your password?"}
                isLoading={this.state.isLoading}
            />
        )
    }
    // this is main render to this page
    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <SafeAreaView >
                    {this.warningModalSec()}
                    <Header {...this.props} goBack={() => this._onBack()} />
                    <ScrollView>
                        <View style={{ marginHorizontal: '6%', marginTop: '10%' }}>
                            <TextComponent text={"Change password"} additionalStyles={styles.changePassText} props={this.props} />
                            <View style={{ marginTop: "15%" }}>
                                {this.currentPasswordSec()}
                                {this.passwordSec()}
                                {this.confirmPasswordSec()}

                            </View>

                            <View style={{ marginHorizontal: '5%', marginTop: '10%' }}>
                                {/* {this.state.resetLoader ?
                                    <ActivityIndicator size={"large"} color={"#348b8a"} /> : */}
                                <BigTextButton
                                    text={"Change Password"}
                                    fontFamily={FontFamily.FONTS.OPENSANS.REGULAR}
                                    fontSize={FontSize.SM}
                                    isLinearGradient={this.state.currentPasswordText == "" ? false : true}
                                    gradientColors={['#2AE5E5', '#008080',]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    fontColor={this.state.currentPasswordText == "" ? "#878787" : "#fff"}
                                    borderRadius={30}
                                    height={50}
                                    onPress={() => this._onChangePassword()}

                                />
                                {/* } */}

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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
