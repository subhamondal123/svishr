import React, { Component } from 'react'
import { ActivityIndicator, FlatList, Image, Platform, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../enums';
import { TextComponent } from '../../shared';
import { Header, NoDataFound } from '../../pageShared';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './Style';
import { StorageDataModification, Toaster } from '../../services/common-view-function';
import { MiddlewareCheck } from '../../services/middleware';
import { ErrorCode } from '../../services/constant';
import { modAllFriendsData } from './Function';
import { App_uri } from '../../services/config';

// this is all friends list component
class AllFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            allFriends: [],
        }
    }
    // this is initial function which is call first
    componentDidMount = async () => {
        await this.onLoad();
    }
    // this is the first function where set state data 
    onLoad = async () => {
        let userData = await StorageDataModification.authData({}, "get");
        let reqData = {
            userId: userData.userInfo.userId,
            userTypeId: userData.userInfo.userTypeId,
            limit: 10,
            offset: 1
        }
        let responseData = await MiddlewareCheck("getAllFrinedList", reqData, this.props)
        if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            this.state.allFriends = modAllFriendsData(responseData.data);
            this.setState(this.state)
        } else {
            Toaster.ShortCenterToaster(responseData.message);
        }
        this.setState({ pageLoader: false })

    }
    // this is back function which is back to previous screen
    _onBack = () => {
        this.props.navigation.goBack();
    }
    // this is the function which is navigate to profileView screen 
    onProfile = (userId) => {
        this.props.navigation.navigate("ProfileView", { userId: userId, reloadRequests: this.onLoad })
    }
    // this is the function which is modified the university data 
    modUniversity = (data) => {
        let university = []
        for (let i = 0; i < data.length; i++) {
            university.push(data[i].name);
            return university.toString();
        }
    }
    // this is the render function 
    _onRenderData = (item, key) => {
        return (
            <TouchableOpacity onPress={() => this.onProfile(item.item.userId)} style={styles.listTab} key={key} activeOpacity={0.9}>
                <View style={{ paddingVertical: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            item.item.profileImgUrl == "" ?
                                <View style={styles.defaultProfileImgSec}>
                                    <Image source={ImageName.PROFILE_ICON} style={styles.defaultProfileImg} />
                                </View>
                                :
                                <View style={styles.profileImgSec}>
                                    <Image source={{ uri: App_uri.IMAGE_VIEW_URI + item.item.profileImgUrl }} style={styles.profileImg} />
                                </View>
                        }
                        <View style={styles.emojiSec}>
                            <View style={styles.emojiSubSec}>
                                <TextComponent text={item.item.countryEmoji} additionalStyles={{ height: 20, width: 20 }} />
                            </View>
                        </View>
                        <View style={{ flex: 1, marginLeft: '2%' }}>
                            <TextComponent text={item.item.name} additionalStyles={styles.profileName} props={this.props} />
                            <TextComponent text={item.item.userTypeId == 2 ? this.modUniversity(item.item.universityData) : item.item.expectedGraduation} additionalStyles={styles.profileUniversity} props={this.props} />
                            <TextComponent text={item.item.degree + ","} additionalStyles={styles.profiledegree} props={this.props} />
                            <TextComponent text={item.item.field} additionalStyles={styles.profiledegree} props={this.props} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.mainView}>
                <Header {...this.props} goBack={() => this._onBack()} />
                <View style={{ marginTop: 10 }} />
                {this.state.pageLoader ? (
                    <View style={styles.loaderSec}>
                        <ActivityIndicator size="large" color={Color.COLOR.BLACK.DARK_BLACK} />
                    </View>
                ) : (
                    <View style={{ marginHorizontal: '3%', marginTop: 10 }}>
                        <TextComponent text={"All Friends"} additionalStyles={styles.allFriendsText} props={this.props} />
                        {this.state.allFriends.length > 0 ?
                            <FlatList
                                data={this.state.allFriends}
                                renderItem={(item, key) => this._onRenderData(item, key)}
                                keyExtractor={(item, key) => key}
                                onEndReachedThreshold={0.1}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            /> :
                            <View style={styles.noDataFoundSec}>
                                <NoDataFound text="No Friends yet" />
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

export default connect(mapStateToProps, mapDispatchToProps)(AllFriends);