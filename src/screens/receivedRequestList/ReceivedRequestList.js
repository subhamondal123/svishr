import React, { Component } from 'react'
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { Header, NoDataFound } from '../../pageShared';
import { TextComponent } from '../../shared';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MiddlewareCheck } from '../../services/middleware';
import { StorageDataModification } from '../../services/common-view-function';
import { Color, Dimension, FontFamily } from '../../enums';
import { ErrorCode } from '../../services/constant';
import { modReceiveRequestData } from './Function';
import { App_uri } from '../../services/config';
import styles from './Style';
// this is received request list component
class ReceivedRequestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receiveRequestData: [],
            degreeData: "",
            fieldData: "",
            universityData: "",
            pageLoader: true,
            limit: 10
        }
    }
    // this is the initial function which is call first 
    componentDidMount = async () => {
        this._load()
    }
    // this is the first function where set state data 
    _load = async () => {
        let userData = await StorageDataModification.authData({}, "get")
        await this.receiveInvitationApiCall(userData)
        this.state.pageLoader = false
        this.setState(this.state)


    }
    // this function used for  getReceiveInvitationUserList api call 
    receiveInvitationApiCall = async (userData) => {
        let reqData = {
            userId: userData.userInfo.userId,
            userTypeId: userData.userInfo.userTypeId,
            limit: this.state.limit,
            offset: 1
        }
        let responseData = await MiddlewareCheck("getReceiveInvitationUserList", reqData, this.props)
        if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            this.state.receiveRequestData = modReceiveRequestData(responseData.data)
            for (let i = 0; i < this.state.receiveRequestData.length; i++) {
                let countryId = this.state.receiveRequestData[i].country;
                await this.universityData(countryId);
                this.degreeData();
                this.fieldData();
                this.state.receiveRequestData[i]["universityName"] = this.state.universityData;
                this.state.receiveRequestData[i]["degreeName"] = this.state.degreeData;
                this.state.receiveRequestData[i]["fieldName"] = this.state.fieldData;
            }
            this.setState(this.state)
        }
    }
    // this function used for universities data api call 
    universityData = async (data) => {
        let reqData = {
            countryId: data
        }
        let universitydata = await MiddlewareCheck("getUniversities", reqData, this.props)
        let university = universitydata.data;
        for (let i = 0; i < university.length; i++) {
            for (let j = 0; j < this.state.receiveRequestData.length; j++) {
                if (university[i].id == this.state.receiveRequestData[j].university) {
                    this.state.universityData = university[i].name
                    this.setState(this.state)

                }
            }
        }

    }
    // this function used for modify degree data 
    degreeData = () => {
        let degreeData = this.props.SvishrRedux.stateLookupData.DEGREE
        for (let i = 0; i < this.state.receiveRequestData.length; i++) {
            for (let j = 0; j < degreeData.length; j++) {
                if (this.state.receiveRequestData[i].degree == degreeData[j].id) {
                    this.state.degreeData = degreeData[j].name
                    this.setState(this.state)
                }
            }
        }
    }
    // this function used for modify field data 
    fieldData = () => {
        let fieldData = this.props.SvishrRedux.stateLookupData.FIELD
        for (let i = 0; i < this.state.receiveRequestData.length; i++) {
            for (let j = 0; j < fieldData.length; j++) {
                if (this.state.receiveRequestData[i].field == fieldData[j].id) {
                    this.state.fieldData = fieldData[j].name
                    this.setState(this.state)
                }
            }
        }
    }
    _onBack = () => {
        this.props.navigation.goBack();
    }
    // this is the function which is navigate profile view screen 
    onProfile = (userId, universityName) => {
        this.props.navigation.navigate("ProfileView", { userId: userId, university: universityName, type: "ReceivedRequest", reloadRequests: this._load })
    }
    // thie is the reseived request list render function 
    _onRenderData = (item, key) => {
        return (
            <TouchableOpacity onPress={() => this.onProfile(item.item.userId, item.item.universityName)} style={styles.profileTabSec} key={key} activeOpacity={0.9}>
                <View style={{ paddingVertical: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            item.item.profileImgUrl == "" ?
                                <View style={styles.defaultProfileImgSec}>
                                    <Image source={ImageName.PROFILE_ICON} style={styles.defaultImg} />
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
                            <TextComponent text={item.item.degreeName + ","} additionalStyles={styles.profileDegreeField} props={this.props} />
                            <TextComponent text={item.item.fieldName} additionalStyles={styles.profileDegreeField} props={this.props} />
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
                        <ActivityIndicator size="large" color={Color.COLOR.BLACK.DARK_BLACK} />
                    </View>
                ) : (
                    <View style={styles.mainView}>
                        <TextComponent text={"Invitation Requests"} additionalStyles={styles.invititionRequestText} props={this.props} />
                        {this.state.receiveRequestData.length > 0 ?
                            <FlatList
                                data={this.state.receiveRequestData}
                                renderItem={(item, key) => this._onRenderData(item, key)}
                                keyExtractor={(item, key) => key}
                                onEndReachedThreshold={0.1}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            /> :
                            <View style={styles.noREquestSec}>
                                <NoDataFound text="No Invitation Requests Yet" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedRequestList);
