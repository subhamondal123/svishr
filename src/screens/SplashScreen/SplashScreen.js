import React, { Component } from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Dimension, FontFamily, ImageName } from '../../enums';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CommonActions } from '@react-navigation/native';
import { TextComponent } from '../../shared';
import { MiddlewareCheck } from '../../services/middleware';
import { ErrorCode } from '../../services/constant';
import { stateLookupData } from '../../redux/SvishrAction';
import { StorageDataModification, Toaster } from '../../services/common-view-function';
import styles from './Style';

// this is the splash screen component
class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authCheck: true,
            navigateCheck: true
        }
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
        let reqData = {};
        let responseData = await MiddlewareCheck("getLookupList", reqData, this.props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.props.stateLookupData(responseData.data)
                await this._onHideGoToNextPage();
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    // this function used for splash screen time set
    _onHideGoToNextPage = async () => {
        var that = this;
        that.myVar = setTimeout(function () {
            that._Hide_Splash_Screen();
        }, 1000);
    }

    // here navigate to another page
    _Hide_Splash_Screen = async () => {
        let userInfo = await StorageDataModification.authData({}, "get");
        // console.log("userInfo", userInfo)
        let userData = await StorageDataModification.userData({}, "get")
        if (userInfo === null || userInfo === undefined) {
            this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'ChooseJourney' }] }));
        } else {
            this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'HomePage' }] }));
        }
    }

    // here the main render the page
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient colors={['#47b8b8', '#008080']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ height: Dimension.height, opacity: 10 }} >
                    <View style={styles.splashImgSec}>
                        <Image source={ImageName.SPLASHSCREEN_IMAGE} style={styles.splashImg} />
                    </View>
                    <View style={{ alignItems: 'center', top: -100 }}>
                        <TextComponent text={"SvishR"} additionalStyles={styles.svishrText} props={this.props} />
                    </View>
                </LinearGradient>
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

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);



