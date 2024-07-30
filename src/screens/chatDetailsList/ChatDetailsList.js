import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../enums';
import { Modal, TextComponent } from '../../shared';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Header, NoDataFound } from '../../pageShared';
import { MiddlewareCheck } from '../../services/middleware';
import { ErrorCode } from '../../services/constant';
import modConversationsData from './Function';
import { StorageDataModification, Toaster } from '../../services/common-view-function';
import styles from './Style';
import SvgComponent from '../../assets/svg';

// this is chat details list component
class ChatDetailsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageText: "",
            pageLoader: true,
            conversationsData: [],
            isDeleteModal: false,
            userData: {},
            intervalId: null,
            sendLoader: false

        }
        this.scrollViewRef = React.createRef();
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        let userData = await StorageDataModification.authData({}, "get");
        this.state.userData = userData;
        await this._load();
        let interValId = setInterval(() => {
            this._load();
        }, 5000)
        this.state.intervalId = interValId;
        this.setState(this.state);

    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    }

    // this is the first function where set the state data
    _load = async () => {
        let reqData = {
            userId: this.state.userData.userInfo.userId,
            userTypeId: this.state.userData.userInfo.userTypeId,
            groupId: this.props.route.params.data.groupId
        }
        let responseData = await MiddlewareCheck("getAllMessageForGroupId", reqData, this.props)
        if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            this.onSeenApiCall()
            this.state.conversationsData = modConversationsData(responseData.data)
            this.setState(this.state)
        } else {
            Toaster.ShortCenterToaster(responseData.message);
        }
        this.setState({ pageLoader: false })
    }
    // this is send api call function which is call initial 
    onSeenApiCall = () => {
        let reqData = {
            userId: this.state.userData.userInfo.userId,
            userTypeId: this.state.userData.userInfo.userTypeId,
            groupId: this.props.route.params.data.groupId
        }
        let responseData = MiddlewareCheck("seenMessageByGroupId", reqData, this.props);
    }
    // this is back function which is navigate to previous screen 
    _onBack = () => {
        this.props.navigation.goBack();
    }
    // this is send message api call function
    onSend = async () => {
        this.setState({ sendLoader: true })
        let reqData = {
            userId: this.state.userData.userInfo.userId,
            userTypeId: this.state.userData.userInfo.userTypeId,
            groupId: this.props.route.params.data.groupId,
            content: this.state.messageText.trim(),
            receiverId: this.props.route.params.data.userId
        }
        let responseData = await MiddlewareCheck("sendMessage", reqData, this.props);
        if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            await this._load();
            this.setState({ messageText: "" });
        } else {
            Toaster.ShortCenterToaster(responseData.message);
        }
        this.setState({ sendLoader: false })

    }
    // this is message onChange function 
    onChangeMsg = (value) => {
        this.state.messageText = value;
        this.setState(this.state);
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
    _onDeleteModal = () => {
        this.state.isDeleteModal = !this.state.isDeleteModal;
        this.setState(this.state);
    }
    // this is the delete message api call function 
    onDelete = async () => {
        let reqData = {
            userId: this.state.userData.userInfo.userId,
            userTypeId: this.state.userData.userInfo.userTypeId,
            groupId: this.props.route.params.data.groupId
        }
        let responseData = await MiddlewareCheck("deleteConvertationByGroupId", reqData, this.props);
        if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            this._onDeleteModal()
            await this._load();
            this.setState({ messageText: "" });
        } else {
            Toaster.ShortCenterToaster(responseData.message);
        }
    }
    // this is the function which is design the header section  
    headerSec = () => {
        return (
            <View style={styles.headerSec}>
                <TouchableOpacity onPress={() => this._onBack()} style={{}}>
                    <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                </TouchableOpacity>
                <View style={{ width: 20 }} />
                <TextComponent text={this.props.route.params.data.name} additionalStyles={styles.chatPersonName} props={this.props} />
                <View style={{ flex: 1 }} />
                <TouchableOpacity activeOpacity={0.9} onPress={() => this._onDeleteModal()} style={{ padding: 5 }}>
                    <Image source={ImageName.THREE_DOTS_ICON} style={styles.threeDotImg} />
                </TouchableOpacity>
            </View>
        )
    }
    // this is the function which is design the delete modal section 
    _onModalSec = () => {
        return (
            <>
                <Modal
                    isVisible={this.state.isDeleteModal}
                    // onRequestClose={() => this._onCloseModal()}
                    onBackdropPress={() => this._onDeleteModal(false)}
                    onBackButtonPress={() => this._onDeleteModal(false)}
                    children={
                        <View style={styles.modalview}>
                            <View style={{ marginTop: 10, marginHorizontal: '5%' }}>
                                <View style={styles.deleteHeaderSec}>
                                    <SvgComponent svgName={"delete"} strokeColor={"#369090"} height={25} width={25} />
                                    <TextComponent text={"Delete Conversion?"} additionalStyles={styles.deleteConversonTxt} props={this.props} />
                                </View>
                                <View style={{ marginHorizontal: '8%', marginTop: 20, }}>
                                    <TextComponent text={"This conversation will be removed from all your synced devices. This action cannot be undone."} additionalStyles={styles.deleteTitleTxt} props={this.props} />
                                </View>
                                <View style={styles.cancleDeleteSec}>
                                    <View style={{ flex: 1 }} />
                                    <TouchableOpacity onPress={() => this._onDeleteModal(false)} activeOpacity={0.9}>
                                        <TextComponent text={"Cancel"} additionalStyles={styles.cancleTxt} props={this.props} />
                                    </TouchableOpacity>
                                    <View style={{ width: 15 }} />
                                    <TouchableOpacity onPress={() => this.onDelete()}>
                                        <TextComponent text={"Delete"} additionalStyles={styles.deleteTxt} props={this.props} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                />
            </>
        )
    }
    // this is the main render to this page 
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Color.COLOR.WHITE.PURE_WHITE, }}>
                {/* <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                > */}
                {this.headerSec()}
                {this._onModalSec()}
                <View style={{ marginHorizontal: '3%', flex: 1, }}>
                    {this.state.pageLoader ? (
                        <View style={styles.loaderSec}>
                            <ActivityIndicator size={"large"} color={Color.COLOR.BLACK.PURE_BLACK} />
                        </View>
                    ) : (
                        <View style={{}}>
                            {
                                this.state.conversationsData.length > 0 ?
                                    <ScrollView
                                        ref={this.scrollViewRef}
                                        onContentSizeChange={() => this.scrollViewRef.current.scrollToEnd({ animated: true })}
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        keyboardShouldPersistTaps="handled"
                                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
                                        inverted
                                    >
                                        <View style={{ marginBottom: "20%", }}>
                                            {this.state.conversationsData.map((item, key) => (
                                                <View style={{ marginHorizontal: "5%" }} key={key}>
                                                    {this.state.userData.userInfo.userId == item.userId ? (
                                                        <View style={styles.chatRightSec} key={key}>
                                                            <View style={styles.chatRightSubSec}>
                                                                <TextComponent text={item.content} additionalStyles={styles.rightChatMsg} props={this.props} />
                                                                <View style={{ alignItems: 'flex-end' }}>
                                                                    <TextComponent text={this.modTime(item.sentAt)} additionalStyles={styles.rightChatTime} props={this.props} />
                                                                </View>
                                                            </View>
                                                        </View>
                                                    ) : (
                                                        <View style={styles.chatLeftSec} key={key}>
                                                            <View style={styles.chatLeftSubSec}>
                                                                <TextComponent text={item.content} additionalStyles={styles.leftChatMsg} props={this.props} />
                                                                <View style={{ alignItems: 'flex-end' }}>
                                                                    <TextComponent text={this.modTime(item.sentAt)} additionalStyles={styles.leftChatTime} props={this.props} />
                                                                </View>
                                                            </View>
                                                        </View>
                                                    )}
                                                </View>
                                            ))}
                                        </View>
                                    </ScrollView>
                                    :
                                    <View style={styles.noREquestSec}>
                                        <View style={styles.imageContainer}>
                                            <Image style={styles.imageGroup2} source={ImageName.SAD_LOGO} />
                                            <View style={{ height: Dimension.height / 8 }} />
                                            <TextComponent text={"No Conversations Yet !"} additionalStyles={styles.noConversationTxt} props={this.props} />
                                        </View>
                                    </View>
                            }

                        </View>
                    )}
                </View>
                {/* </KeyboardAvoidingView> */}
                <View style={styles.footer}>
                    <View style={styles.inputBoxContainer}>
                        <TextInput
                            placeholder='Write your message'
                            returnKeyType='done'
                            placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                            value={this.state.messageText}
                            onChangeText={this.onChangeMsg}
                            style={styles.inputStyle}

                        />
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity disabled={this.state.messageText === ""} activeOpacity={0.9} style={styles.sendSec} onPress={this.onSend}
                        >

                            {
                                this.state.sendLoader ?
                                    <View style={styles.loaderSec}>
                                        <ActivityIndicator size={"small"} color={Color.COLOR.WHITE.PURE_WHITE} />
                                    </View>
                                    :
                                    <Image source={ImageName.SEND_IMAGE} style={styles.sendImg} />
                            }
                        </TouchableOpacity>




                    </View>

                </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(ChatDetailsList);
