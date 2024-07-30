import React, { Component } from 'react'
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { Color, Dimension, FontFamily, ImageName } from '../../enums';
import { Header, NoDataFound } from '../../pageShared';
import { TextComponent } from '../../shared';
import { MiddlewareCheck } from '../../services/middleware';
import { App_uri } from '../../services/config';
import { StorageDataModification } from '../../services/common-view-function';
import { ErrorCode } from '../../services/constant';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modRequestList } from './Function';
import styles from './Style';
// this is request list comonent 
class RequestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestData: [],
            degreeData: "",
            fieldData: "",
            universityData: "",
            pageLoader: true,
            limit: 10
        }
    }
    // this is initial function which is call first 
    componentDidMount = async () => {
        this._load()
    }
    // this is the first function where set state data 
    _load = async () => {
        let userData = await StorageDataModification.authData({}, "get");
        await this.sendInvitationApiCall(userData);
        this.state.pageLoader = false;
        this.setState(this.state);

    }
    // this function used for getSendInvitationUserList api call 
    sendInvitationApiCall = async (userData) => {
        let reqData = {
            userId: userData.userInfo.userId,
            userTypeId: userData.userInfo.userTypeId,
            limit: this.state.limit,
            offset: 1
        }
        let responseData = await MiddlewareCheck("getSendInvitationUserList", reqData, this.props)
        if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            this.state.requestData = modRequestList(responseData.data)
            for (let i = 0; i < this.state.requestData.length; i++) {
                let countryId = this.state.requestData[i].country;
                await this.universityData(countryId);
                this.degreeData();
                this.fieldData();
                this.state.requestData[i]["universityName"] = this.state.universityData;
                this.state.requestData[i]["degreeName"] = this.state.degreeData;
                this.state.requestData[i]["fieldName"] = this.state.fieldData;
            }
            this.setState(this.state)
        }
    }
    // this function used for university api call 
    universityData = async (data) => {
        let reqData = {
            countryId: data
        }
        let universitydata = await MiddlewareCheck("getUniversities", reqData, this.props)
        let university = universitydata.data;
        for (let i = 0; i < university.length; i++) {
            for (let j = 0; j < this.state.requestData.length; j++) {
                if (university[i].id == this.state.requestData[j].university) {
                    this.state.universityData = university[i].name;
                    this.setState(this.state);

                }
            }
        }
    }
    // this function used for modified degree data 
    degreeData = () => {
        let degreeData = this.props.SvishrRedux.stateLookupData.DEGREE;
        for (let i = 0; i < this.state.requestData.length; i++) {
            for (let j = 0; j < degreeData.length; j++) {
                if (this.state.requestData[i].degree == degreeData[j].id) {
                    this.state.degreeData = degreeData[j].name;
                    this.setState(this.state);
                }
            }
        }
    }
    // this function used for modified field data 
    fieldData = () => {
        let fieldData = this.props.SvishrRedux.stateLookupData.FIELD;
        for (let i = 0; i < this.state.requestData.length; i++) {
            for (let j = 0; j < fieldData.length; j++) {
                if (this.state.requestData[i].field == fieldData[j].id) {
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
    // this function used for navigate to profile view screen 
    onProfile = (userId) => {
        this.props.navigation.navigate("ProfileView", { userId: userId, })
    }
    // this is request list render function 
    _onRenderData = (item, key) => {
        return (
            <TouchableOpacity onPress={() => this.onProfile(item.item.userId)} style={styles.profileTabSec} key={key} activeOpacity={0.9}>
                <View style={{ paddingVertical: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            item.item.profileImgUrl == "" ?
                                <View style={styles.defaultImgSec}>
                                    <Image source={ImageName.PROFILE_ICON} style={styles.defaultImg} />
                                </View> :
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
                            <TextComponent text={item.item.degreeName + ","} additionalStyles={styles.profileFieldDegree} props={this.props} />
                            <TextComponent text={item.item.fieldName} additionalStyles={styles.profileFieldDegree} props={this.props} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    // this is the main render to this page 
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
                        <TextComponent text={"Send Requests"} additionalStyles={styles.sendRequestsText} props={this.props} />
                        {this.state.requestData.length > 0 ?
                            <FlatList
                                data={this.state.requestData}
                                renderItem={(item, key) => this._onRenderData(item, key)}
                                keyExtractor={(item, key) => key}
                                onEndReachedThreshold={0.1}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            /> :
                            <View style={styles.noRequstsText}>
                                <NoDataFound text="No Send Requests Yet" />
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

export default connect(mapStateToProps, mapDispatchToProps)(RequestList);
