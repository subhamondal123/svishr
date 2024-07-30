import React, { Component } from 'react'
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { Color, Dimension, FontFamily, ImageName } from '../../enums'
import styles from './Style';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BigTextButton, Dropdown, TextComponent } from '../../shared';
import { Header, NoDataFound } from '../../pageShared';
import { StorageDataModification, Toaster } from '../../services/common-view-function';
import { MiddlewareCheck } from '../../services/middleware';
import { ErrorCode } from '../../services/constant';
import { modBookMarkData } from './Function';
import { App_uri } from '../../services/config';

// this is bookmark list component
class BookmarkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookMarkList: [],
            pageLoader: true,
            degreeData: "",
            fieldData: "",
            universityData: "",
            pageNum: 0,
            limit: 10,
        }
    }
    // this is the initial function which is call first 
    componentDidMount = async () => {
        this._load();
    }
    // this is the first function where set state data 
    _load = async () => {
        let userData = await StorageDataModification.authData({}, "get");
        let reqData = {
            userId: userData.userInfo.userId,
            userTypeId: userData.userInfo.userTypeId,
            requestUserTypeId: 2,
            limit: this.state.limit.toString(),
            offset: 2,
        }
        let responseData = await MiddlewareCheck("getBookmarkUserList", reqData, this.props)
        if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            this.state.bookMarkList = modBookMarkData(responseData.data)
            for (let i = 0; i < this.state.bookMarkList.length; i++) {
                let countryId = this.state.bookMarkList[i].country;
                await this.universityData(countryId);
                this.degreeData();
                this.fieldData();
                this.state.bookMarkList[i]["universityName"] = this.state.universityData;
                this.state.bookMarkList[i]["degreeName"] = this.state.degreeData;
                this.state.bookMarkList[i]["fieldName"] = this.state.fieldData;
            }
            this.setState(this.state);

        } else {
            Toaster.ShortCenterToaster(responseData.message);
        }
        this.setState({ pageLoader: false })
    }
    // this is the function where calling universities api 
    universityData = async (data) => {
        let reqData = {
            countryId: data,
        }
        let universitydata = await MiddlewareCheck("getUniversities", reqData, this.props);
        let university = universitydata.data;
        for (let i = 0; i < university.length; i++) {
            for (let j = 0; j < this.state.bookMarkList.length; j++) {
                if (university[i].id == this.state.bookMarkList[j].university) {
                    this.state.universityData = university[i].name;
                    this.setState(this.state);

                }
            }
        }

    }
    // this the function where modified degree data 
    degreeData = () => {
        let degreeData = this.props.SvishrRedux.stateLookupData.DEGREE;
        for (let i = 0; i < this.state.bookMarkList.length; i++) {
            for (let j = 0; j < degreeData.length; j++) {
                if (this.state.bookMarkList[i].degree == degreeData[j].id) {
                    this.state.degreeData = degreeData[j].name;
                    this.setState(this.state);
                }
            }
        }
    }
    // this is the function where modified field data 
    fieldData = () => {
        let fieldData = this.props.SvishrRedux.stateLookupData.FIELD;
        for (let i = 0; i < this.state.bookMarkList.length; i++) {
            for (let j = 0; j < fieldData.length; j++) {
                if (this.state.bookMarkList[i].field == fieldData[j].id) {
                    this.state.fieldData = fieldData[j].name;
                    this.setState(this.state);
                }
            }
        }
    }
    // this is the back function which is navigate to previous screen 
    _onBack = () => {
        this.props.navigation.goBack();
    }
    // this is the function which is navigate to profile view screen 
    onProfile = (userId) => {
        this.props.navigation.navigate("ProfileView", { userId: userId, reloadRequests: this.onLoad })
    }
    // this is the render function 
    _onRenderData = (item, key) => {
        return (
            <TouchableOpacity onPress={() => this.onProfile(item.item.userId)} style={styles.profileTabSec} key={key} activeOpacity={0.9}>
                <View style={{ paddingVertical: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            item.item.profileImgUrl == "" ?
                                <View style={styles.defaultProfileImgSec}>
                                    <Image source={ImageName.PROFILE_ICON} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                                </View>
                                :
                                <View style={styles.profileImgSec}>
                                    <Image source={{ uri: App_uri.IMAGE_VIEW_URI + item.item.profileImgUrl }} style={styles.profileImg} />
                                </View>
                        }
                        <View style={styles.countryEmojiSec}>
                            <View style={styles.countryEmojiSubSec}>
                                <TextComponent text={item.item.countryEmoji} additionalStyles={{ height: 20, width: 20 }} />
                            </View>
                        </View>
                        <View style={{ flex: 1, marginLeft: '2%' }}>
                            <TextComponent text={item.item.name} additionalStyles={styles.profileName} props={this.props} />
                            <TextComponent text={item.item.userTypeId == 2 ? item.item.universityName : item.item.expectedGraduation} additionalStyles={styles.profileUniversity} props={this.props} />
                            <TextComponent text={item.item.degreeName + ","} additionalStyles={styles.profileDetails} props={this.props} />
                            <TextComponent text={item.item.fieldName} additionalStyles={styles.profileDetails} props={this.props} />
                        </View>
                        <Image source={ImageName.YELLOW_TONE} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} goBack={() => this._onBack()} />
                <View style={{ marginTop: 10 }} />
                {this.state.pageLoader ? (
                    <View style={styles.loaderSec}>
                        <ActivityIndicator size="large" color={Color.COLOR.BLACK.PURE_BLACK} />
                    </View>
                ) : (
                    <View style={styles.mainView}>
                        <TextComponent text={"Saved Bookmarks"} additionalStyles={styles.savedBookmarkText} props={this.props} />
                        {this.state.bookMarkList.length > 0 ?
                            <FlatList
                                data={this.state.bookMarkList}
                                renderItem={(item, key) => this._onRenderData(item, key)}
                                keyExtractor={(item, key) => key}
                                onEndReachedThreshold={0.1}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            />
                            :
                            <View style={styles.noBookmarkSec}>
                                <NoDataFound text="No Saved Bookmarks yet" />
                            </View>
                        }
                    </View>
                )}
                <View style={{ marginBottom: 100 }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkList);







