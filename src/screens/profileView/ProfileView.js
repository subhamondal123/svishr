import React, { Component } from 'react'
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../enums'
import LinearGradient from 'react-native-linear-gradient'
import styles from './Style';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BigTextButton, TextComponent } from '../../shared';
import { Header } from '../../pageShared';
import { StorageDataModification, Toaster } from '../../services/common-view-function';
import { MiddlewareCheck } from '../../services/middleware';
import { ErrorCode } from '../../services/constant';
import { modProfileInfoData } from './Function';
import { App_uri } from '../../services/config';
// this is the profile view component 
class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hobbiesArr: [],
            profileInfoData: {},
            pageLoader: true,
            isBookMark: false,
            isSendRequest: false,
            buttonLoader: false,
            userData: {},
            acceptLoader: false,
            declineLoader: false,
            unfriendLoader: false,
        }
    }
    // this is the initial function which is call first 
    componentDidMount = async () => {
        await this._load();
    }
    // this is the first function where set state data 
    _load = async () => {
        let userData = await StorageDataModification.authData({}, "get")
        this.state.userData = userData;
        this.setState(this.state)
        let reqData = {
            userId: this.state.userData.userInfo.userId,
            userTypeId: this.state.userData.userInfo.userTypeId,
            requestUserId: this.props.route.params.userId
        }
        let responseData = await MiddlewareCheck("getSelectedProfileInfo", reqData, this.props)
        if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            this.state.profileInfoData = modProfileInfoData(responseData.data.userInfo)
            this.state.hobbiesArr = this.state.profileInfoData.hobbiesData
            this.setState(this.state);
        } else {
            Toaster.ShortCenterToaster(responseData.message);
        }
        this.setState({ pageLoader: false })

    }

    // this is the back function which is navigate to previous screen 
    _onBack = () => {
        this.props.navigation.goBack();
    }
    // this function used for add bookmark api call 
    onBookMark = async () => {
        let reqData = {
            userId: this.state.userData.userInfo.userId,
            userTypeId: this.state.userData.userInfo.userTypeId,
            requestUserId: this.state.profileInfoData.userId
        }
        if (this.state.profileInfoData.bookmarkUser == 0) {
            responseData
            let responseData = await MiddlewareCheck("addBookmarkUser", reqData, this.props)
            if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await this._load()
                this.props.route.params.reloadRequests();
                Toaster.ShortCenterToaster(responseData.message);
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        } else {
            let responseData = await MiddlewareCheck("deleteBookmarkUser", reqData, this.props)
            if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await this._load()
                this.props.route.params.reloadRequests();
                Toaster.ShortCenterToaster(responseData.message);
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }

    }
    // this function used for request api call 
    onRequest = async () => {
        this.setState({ buttonLoader: true });
        let reqData = {
            userId: this.state.userData.userInfo.userId,
            userTypeId: this.state.userData.userInfo.userTypeId,
            requestUserId: this.props.route.params.userId
        }
        let responseData = await MiddlewareCheck("sendUserInvitation", reqData, this.props)
        if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            await this._load()
            Toaster.ShortCenterToaster(responseData.message);
        } else {
            Toaster.ShortCenterToaster(responseData.message);
        }
        this.setState({ buttonLoader: false });
    }

    // for cancel request
    onCancelRequest = async () => {
        this.setState({ buttonLoader: true });
        let reqData = {
            userId: this.state.userData.userInfo.userId,
            userTypeId: this.state.userData.userInfo.userTypeId,
            requestUserId: this.props.route.params.userId
        }
        let responseData = await MiddlewareCheck("deleteUserInvitation", reqData, this.props)
        if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            await this._load()
            Toaster.ShortCenterToaster(responseData.message);
        } else {
            Toaster.ShortCenterToaster(responseData.message);
        }
        this.setState({ buttonLoader: false });
    }
    // this is the function which is call accept invitation api
    onAccept = async () => {
        reqData = {
            userId: this.state.userData.userInfo.userId,
            userTypeId: this.state.userData.userInfo.userTypeId,
            invitationId: this.state.profileInfoData.isInvitedId
        }
        this.setState({ acceptLoader: true })
        let responseData = await MiddlewareCheck("acceptUserInvitation", reqData, this.props)
        if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            await this._load()
            this.props.route.params.reloadRequests();
            Toaster.ShortCenterToaster(responseData.message)
        } else {
            Toaster.ShortCenterToaster(responseData.message)
        }
        this.setState({ acceptLoader: false })
    }
    // this is the function which is call decline invitation api 
    onDecline = async () => {
        reqData = {
            userId: this.state.userData.userInfo.userId,
            userTypeId: this.state.userData.userInfo.userTypeId,
            invitationId: this.state.profileInfoData.isInvitedId
        }
        this.setState({ declineLoader: true })
        let responseData = await MiddlewareCheck("declineUserInvitation", reqData, this.props)
        if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            await this._load()
            this.props.route.params.reloadRequests();
            Toaster.ShortCenterToaster(responseData.message)
        } else {
            Toaster.ShortCenterToaster(responseData.message)
        }
        this.setState({ declineLoader: false })
    }
    // this is the function which is call unfriend api call 
    onUnfriend = async () => {
        let reqData = {
            userId: this.state.userData.userInfo.userId,
            userTypeId: this.state.userData.userInfo.userTypeId,
            requestUserId: this.props.route.params.userId
        }
        this.setState({ unfriendLoader: true })
        let responseData = await MiddlewareCheck("deleteUserFromFriend", reqData, this.props)
        if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            await this._load()
            this.props.route.params.reloadRequests();
            Toaster.ShortCenterToaster(responseData.message)
        } else {
            Toaster.ShortCenterToaster(responseData.message)
        }
        this.setState({ unfriendLoader: false })
    }
    // this function used for navigate to chat screen 
    onChat = () => {
        let data = {
            userId: this.state.profileInfoData.userId,
            name: this.state.profileInfoData.name
        }
        this.props.navigation.navigate("ChatList", { data })
    }
    // this function used for modify universities data 
    commonfunction = (university) => {
        let tempUniversity = []
        for (let i = 0; i < university.length; i++) {
            tempUniversity.push(university[i].name)
        }
        return tempUniversity.toString();
    }
    // this is the main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.mainView}>
                <Header {...this.props} goBack={() => this._onBack()} />
                {this.state.pageLoader ? (
                    <View style={styles.loaderSec}>
                        <ActivityIndicator size="large" color={Color.COLOR.BLACK.PURE_BLACK} />
                    </View>
                ) : (
                    <>
                        <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: '5%' }}>
                            {this.state.profileInfoData.profileImgUrl == "" ?
                                <View style={styles.profileImgSec}>
                                    <Image source={ImageName.PROFILE_ICON} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                                </View> :
                                <View style={styles.profileImgSec}>
                                    <Image source={{ uri: App_uri.IMAGE_VIEW_URI + this.state.profileInfoData.profileImgUrl }} style={styles.profileImg} />
                                </View>
                            }
                            <View style={{ alignItems: 'flex-end', }}>
                                <View style={styles.countryEmojiSec}>
                                    <TextComponent text={this.state.profileInfoData.countryEmoji} />
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', marginLeft: '5%' }}>
                                <TextComponent text={this.state.profileInfoData.name} additionalStyles={styles.profileName} props={this.props} />
                                <TextComponent text={this.state.profileInfoData.userTypeId == 2 ? this.commonfunction(this.state.profileInfoData.universityData) : null} additionalStyles={styles.profileUnivName} props={this.props} />
                            </View>
                            <TouchableOpacity onPress={() => this.onBookMark()} activeOpacity={0.7}>
                                {
                                    this.state.profileInfoData.bookmarkUser ?
                                        <Image source={ImageName.YELLOW_TONE} style={styles.bookMarkIcon} />
                                        :
                                        <Image source={ImageName.TWO_TONE} style={styles.bookMarkIcon} />
                                }

                            </TouchableOpacity>
                        </View>
                        <View style={{ borderTopColor: '#D9D9D9', borderTopWidth: 3, marginTop: 15 }} />
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            <View style={styles.profileInfoSec}>
                                <View style={{ marginTop: 8 }}>
                                    <TextComponent text={"Major"} additionalStyles={styles.profileInfoFieldTxt} props={this.props} />
                                    <TextComponent text={this.state.profileInfoData.degree + "," + this.state.profileInfoData.field} additionalStyles={styles.profileInfoValueTxt} props={this.props} />
                                </View>
                                {/* <View style={{ marginTop: 8 }}>
                                    <TextComponent text={"Specialization"} additionalStyles={styles.profileInfoFieldTxt} props={this.props} />
                                    <TextComponent text={this.state.profileInfoData.specialization} additionalStyles={styles.profileInfoValueTxt} props={this.props} />
                                </View> */}
                                <View style={{ marginTop: 8 }}>
                                    <TextComponent text={"Excepted Graduation"} additionalStyles={styles.profileInfoFieldTxt} props={this.props} />
                                    <TextComponent text={this.state.profileInfoData.expectedGraduation} additionalStyles={styles.profileInfoValueTxt} props={this.props} />
                                </View>
                                <View style={{ marginTop: 8 }}>
                                    <TextComponent text={"Hobbies"} additionalStyles={styles.profileInfoFieldTxt} props={this.props} />
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {this.state.hobbiesArr.map((item, key) => (
                                            <View style={styles.hobbiesSec} key={key}>
                                                <View style={{ marginHorizontal: 6 }}>
                                                    <TextComponent text={item.name} additionalStyles={styles.hobbiesName} props={this.props} />
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                                <View style={{ marginTop: 8 }}>
                                    <TextComponent text={"Bio"} additionalStyles={styles.profileInfoFieldTxt} props={this.props} />
                                    <TextComponent text={this.state.profileInfoData.userStory} additionalStyles={styles.bioTxt} props={this.props} />
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.requestBtnSec}>
                            <View style={{ borderTopColor: '#D9D9D9', borderTopWidth: 3, }} />
                            <View style={{ marginTop: 35, marginHorizontal: '8%', marginBottom: 30 }}>
                                {(this.state.profileInfoData.isAccepted == "1" || this.state.profileInfoData.isInvited == "2") ?
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {this.state.unfriendLoader ?
                                            <View style={styles.buttonLoader}>
                                                <ActivityIndicator size="small" color={Color.COLOR.BLACK.PURE_BLACK} />
                                            </View> :
                                            <BigTextButton
                                                text={"Unfriend"}
                                                height={45}
                                                borderRadius={22}
                                                fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                                isLinearGradient={true}
                                                gradientColors={['#2AE5E5', '#008080',]}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                onPress={() => this.onUnfriend()}
                                            />
                                        }
                                        <View style={{ width: 20 }} />
                                        {this.state.buttonLoader ?
                                            <View style={styles.buttonLoader}>
                                                <ActivityIndicator size="small" color={Color.COLOR.BLACK.PURE_BLACK} />
                                            </View> :
                                            <BigTextButton
                                                text={"Chat"}
                                                height={45}
                                                borderRadius={22}
                                                fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                                isLinearGradient={true}
                                                gradientColors={['#2AE5E5', '#008080',]}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                onPress={() => this.onChat()}
                                            />
                                        }
                                    </View> :
                                    <React.Fragment>
                                        {(this.state.profileInfoData.invitationStatus == "1") ?
                                            <React.Fragment>
                                                {this.state.buttonLoader ?
                                                    <View style={styles.buttonLoader}>
                                                        <ActivityIndicator size="small" color={Color.COLOR.BLACK.PURE_BLACK} />
                                                    </View> :
                                                    <BigTextButton
                                                        text={"Cancel Request"}
                                                        height={45}
                                                        borderRadius={22}
                                                        fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                                        isLinearGradient={true}
                                                        gradientColors={['#2AE5E5', '#008080',]}
                                                        start={{ x: 0, y: 0 }}
                                                        end={{ x: 1, y: 0 }}
                                                        onPress={() => this.onCancelRequest()}
                                                        backgroundColor={null}
                                                    />
                                                }
                                            </React.Fragment> :
                                            <React.Fragment>
                                                {(this.state.profileInfoData.isInvited == "1") ?
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        {this.state.declineLoader ?
                                                            <View style={styles.buttonLoader}>
                                                                <ActivityIndicator size="small" color={Color.COLOR.BLACK.PURE_BLACK} />
                                                            </View> :
                                                            <BigTextButton
                                                                text={"Decline"} height={45}
                                                                borderRadius={22}
                                                                fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                                                isLinearGradient={true}
                                                                gradientColors={['#2AE5E5', '#008080',]}
                                                                start={{ x: 0, y: 0 }}
                                                                end={{ x: 1, y: 0 }}
                                                                backgroundColor={null}
                                                                onPress={() => this.onDecline()}
                                                            />
                                                        }
                                                        <View style={{ width: 20 }} />
                                                        {this.state.acceptLoader ?
                                                            <View style={styles.buttonLoader}>
                                                                <ActivityIndicator size="small" color={Color.COLOR.BLACK.PURE_BLACK} />
                                                            </View> :
                                                            <BigTextButton
                                                                text={"Accept"} height={45}
                                                                borderRadius={22}
                                                                fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                                                isLinearGradient={true}
                                                                gradientColors={['#2AE5E5', '#008080',]}
                                                                start={{ x: 0, y: 0 }}
                                                                end={{ x: 1, y: 0 }}
                                                                backgroundColor={null}
                                                                onPress={() => this.onAccept()}
                                                            />
                                                        }
                                                    </View> :
                                                    <React.Fragment>
                                                        {this.state.buttonLoader ?
                                                            <View style={styles.buttonLoader}>
                                                                <ActivityIndicator size="small" color={Color.COLOR.BLACK.PURE_BLACK} />
                                                            </View> :
                                                            <BigTextButton
                                                                text={"Request"}
                                                                height={45}
                                                                borderRadius={22}
                                                                fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                                                isLinearGradient={true}
                                                                gradientColors={['#2AE5E5', '#008080',]}
                                                                start={{ x: 0, y: 0 }}
                                                                end={{ x: 1, y: 0 }}
                                                                onPress={() => this.onRequest()}
                                                                backgroundColor={null}
                                                            />
                                                        }
                                                    </React.Fragment>
                                                }
                                            </React.Fragment>
                                        }
                                    </React.Fragment>
                                }
                            </View>
                        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);







