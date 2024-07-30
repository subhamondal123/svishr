import React, { Component } from 'react'
import { ActivityIndicator, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../enums'
import styles from './Style';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BigTextButton, TextComponent } from '../../shared';
import { COLOR } from '../../enums/color';
import SvgComponent from '../../assets/svg';
import { StorageDataModification, Toaster } from '../../services/common-view-function';
import { MiddlewareCheck } from '../../services/middleware';
import { ErrorCode } from '../../services/constant';
import { modDashboardData, modProfileInfoData } from './Function';
import { App_uri } from '../../services/config';
import { MentorMenteeMatchProfile, MentorMenteeSimilarBackground } from '../../pageShared';
import { CommonActions } from '@react-navigation/native';


let Data = [
    {
        id: 1,
        name: "Invitation Requests",
    },
    {
        id: 2,
        name: "Send Requests",

    },
    {
        id: 3,
        name: "All Friends",
    },
]

// this is home component 
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mentorMenteeProfileArr: [],
            menteeAndMentorProfileArr: [],
            cardData: Data,
            userInfo: {},
            universityData: "",
            profileInfoData: {},
            pageLoader: true,
            degreeData: "",
            fieldData: "",
            requestListData: [],
            pageNum: 0,
            limit: 10,
            loginType: "",
            hasUnsavedChanges: true

        }
    }
    // this is initial function which is call first 
    componentDidMount = async () => {

        this.props.navigation.addListener('beforeRemove', (e) => {
            if (!this.state.hasUnsavedChanges) {
                // If we don't have unsaved changes, then we don't need to do anything
                // console.log("helloo")
                return;
            }

            // Prevent default behavior of leaving the screen
            e.preventDefault();

            // Prompt the user before leaving the screen
            // console.log("alrervdhcg")
        })
        this._load();
    }
    // this is the first function where set state data 
    _load = async () => {
        let typeData = await StorageDataModification.loginTypeData({}, "get")
        this.state.loginType = typeData
        this.setState(this.state)
        let userData = await StorageDataModification.userData({}, "get")
        let reqData = {
            userId: userData.userInfo.userId,
            userTypeId: userData.userInfo.userTypeId,
        }
        let responseData = await MiddlewareCheck("getProfileInfoForUpdate", reqData, this.props);
        if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            this.state.profileInfoData = modProfileInfoData(responseData.data.userInfo)
        } else {
            Toaster.ShortCenterToaster(responseData.message)
        }

        this.setState({ pageLoader: false })
    }
    // this function used for navigate to send request list screen 
    onSendRequestList = () => {
        this.props.navigation.navigate("SendRequestList")
    }
    // this function used for navigate to request list screen  
    _onRequestList = () => {
        this.props.navigation.navigate("RequestList")
    }
    // this function used for navigate to saved bookmark list screen 
    _onBookmarks = () => {
        this.props.navigation.navigate("SavedMentorList")
    }
    // this function used for implementation of button click 
    onTabClick = (type) => {
        if (type == "Invitation Requests") {
            this.props.navigation.navigate("RequestList")
        } else if (type == "Send Requests") {
            this.props.navigation.navigate("SendRequestList")
        } else if (type == "All Friends") {
            this.props.navigation.navigate("AllFriends")
        }
    }
    // this is the main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.mainView}>
                {this.state.pageLoader ? (
                    <View style={styles.loaderSec}>
                        <ActivityIndicator size="large" color={Color.COLOR.BLACK.PURE_BLACK} />
                    </View>
                ) : (
                    <>
                        <View style={styles.headerSec}>
                            <View style={{ flex: 1 }}>
                                <TextComponent text={"Welcome, " + this.state.profileInfoData.name} additionalStyles={styles.welcomeText} props={this.props} />
                            </View>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => this._onBookmarks()}>
                                <SvgComponent svgName={"bookmark"} strokeColor={"#f5a402"} height={18} width={18} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={{ flexDirection: 'row', }}>
                                    {this.state.cardData.map((item, key) => (
                                        <TouchableOpacity onPress={() => this.onTabClick(item.name)} style={styles.tabButtonSec} key={key} activeOpacity={0.9}>
                                            <View style={{ margin: 12 }}>
                                                <TextComponent text={item.name} additionalStyles={styles.tabButtonText} props={this.props} />
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 20, marginRight: 12 }}>
                                                <View style={{ flex: 0.7 }} />
                                                <View style={{ flex: 0.3 }}>
                                                    <BigTextButton
                                                        backgroundColor={Color.COLOR.WHITE.PURE_WHITE}
                                                        height={35}
                                                        text={"Go"}
                                                        fontSize={FontSize.MD}
                                                        borderRadius={16}
                                                        fontColor={"#2f807f"}
                                                        onPress={() => this.onTabClick(item.name)}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                            <View style={{ marginTop: 10, backgroundColor: '#fef6e5', padding: 20, }}>
                                <TextComponent text={`${this.state.loginType == "Mentor" ? "Mentees" : "Mentors"} matching your profile`} additionalStyles={styles.matchProfileText} props={this.props} />
                                <MentorMenteeMatchProfile
                                    props={this.props}
                                />
                            </View>

                            <View style={{ marginTop: 10, padding: 20, }}>
                                <TextComponent text={`${this.state.loginType + "s"} with similar background`} additionalStyles={styles.similarBgText} props={this.props} />
                                <MentorMenteeSimilarBackground
                                    props={this.props}
                                />
                            </View>
                        </ScrollView>
                    </>
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

    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);







