import React, { Component } from 'react'
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../enums'
import styles from './Style';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BigTextButton, Modal, TextComponent } from '../../shared';
import { COLOR } from '../../enums/color';
import SvgComponent from '../../assets/svg';
import { MiddlewareCheck } from '../../services/middleware';
import { StorageDataModification, Toaster } from '../../services/common-view-function';
import { ErrorCode } from '../../services/constant';
import modChatList from './Function';
import { NoDataFound } from '../../pageShared';
import { App_uri } from '../../services/config';

// this is chat list component 
class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatArr: [],
            isDeleteModal: false,
            pageLoader: true,
            intervalId: null
        }
    }
    // this is initial function which is call first  
    componentDidMount = async () => {
        await this._load();
        let interValId = setInterval(() => {
            this._load();
        }, 5000)
        this.state.intervalId = interValId;
        this.setState(this.state);
    }
    // this is initial function which is call first 
    componentWillUnmount = () => {
        clearInterval(this.state.intervalId)
    }
    // this is the first function where set the state data 
    _load = async () => {
        let userData = await StorageDataModification.authData({}, "get");
        let reqData = {
            userId: userData.userInfo.userId,
            userTypeId: userData.userInfo.userTypeId,
            limit: 10,
            offset: 1
        }
        let responseData = await MiddlewareCheck("getAllChatList", reqData, this.props);
        if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            this.state.chatArr = modChatList(responseData.data);
            this.setState(this.state);
        } else {
            Toaster.ShortCenterToaster(responseData.message);
        }
        this.setState({ pageLoader: false });
    }

    // this is the function which is navigate to chat details list screen 
    onChatDetails = (userId, name, groupId) => {
        let data = {
            userId: userId,
            name: name,
            groupId: groupId
        }
        this.props.navigation.navigate("ChatDetailsList", { data });
    }
    // this is the function which is modified the time 
    modTime = (dateString) => {
        const date = new Date(dateString);

        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        const formattedMinutes = minutes.toString().padStart(2, '0'); // Add leading zero if needed
        const ampm = hours >= 12 ? 'PM' : 'AM';

        const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
        return formattedTime;
    }
    // this is the render function 
    _onRenderData = (item, key) => {
        return (
            <TouchableOpacity style={styles.chatListTab} key={key} onPress={() => this.onChatDetails(item.item.userId, item.item.name, item.item.groupId)} activeOpacity={0.9} >
                {
                    item.profileImgUrl == "" ?
                        <View style={styles.defaultProfileImgSec}>
                            <Image source={ImageName.PROFILE_ICON} style={styles.defaultImg} />
                        </View>
                        :
                        <View style={styles.profileImgSec}>
                            <Image source={{ uri: App_uri.IMAGE_VIEW_URI + item.item.profileImgUrl }} style={styles.profileImg} />
                        </View>
                }

                <View style={{ flex: 1, marginLeft: '5%' }}>
                    <TextComponent text={item.item.name} additionalStyles={styles.chatListName} props={this.props} />
                    <TextComponent text={item.item.content} additionalStyles={styles.chatMsg} numberOfLines={1} props={this.props} />
                </View>
                <TouchableOpacity>
                    <TextComponent text={item.item.lastMessageTime == "" ? null : this.modTime(item.item.lastMessageTime)} additionalStyles={styles.timeTxt} props={this.props} />
                    <View style={{ alignItems: 'flex-end' }}>
                        {
                            item.item.unseenMessageCount == "" ?
                                null
                                :
                                <View style={styles.chatCountSec}>
                                    <TextComponent text={item.item.unseenMessageCount.toString()} additionalStyles={styles.chatCount} props={this.props} />
                                </View>
                        }

                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        )

    }
    // this is the main render function to this page 
    render() {
        return (
            <SafeAreaView style={styles.mainView}>
                {
                    this.state.pageLoader ?
                        <View style={styles.loaderSec}>
                            <ActivityIndicator size="large" color={Color.COLOR.BLACK.PURE_BLACK} />
                        </View>
                        :
                        <View style={{ marginTop: "8%", marginHorizontal: '5%' }}>
                            <View style={{ marginHorizontal: "3%" }}>
                                <TextComponent text={"Chats"} additionalStyles={styles.chatHeaderTxt} props={this.props} />
                            </View>
                            {this.state.chatArr.length > 0 ?
                                <FlatList
                                    data={this.state.chatArr}
                                    renderItem={(item, key) => this._onRenderData(item, key)}
                                    keyExtractor={(item, key) => key}
                                    onEndReachedThreshold={0.1}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                /> :
                                <View style={styles.noREquestSec}>
                                    <NoDataFound text="No Chat Yet" />
                                </View>
                            }
                        </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);







