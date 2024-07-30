import { useEffect, useState } from "react";
import SvgComponent from "../../assets/svg";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../enums";
import { App_uri } from "../../services/config";
import { TextComponent } from "../../shared";
import { PropTypes } from 'prop-types';
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StorageDataModification, Toaster } from "../../services/common-view-function";
import { MiddlewareCheck } from "../../services/middleware";
import { ErrorCode } from "../../services/constant";
import { modDashboardData } from "./Function";
import styles from "./Style";

function MentorMenteeMatchProfile({
    props,
}) {
    const [limit, setLimit] = useState(10);
    const [menteeAndMentorProfileArr, setMenteeAndMentorProfileArr] = useState([]);
    const [pageLoader, setPageLoader] = useState(true);
    const [loginType, setLoginType] = useState("");
    const [userData, setUserData] = useState({});

    useEffect(() => {
        _onload();
    }, [])

    const _onload = async () => {
        let userData = await StorageDataModification.userData({}, "get")
        let typeData = await StorageDataModification.loginTypeData({}, "get")
        setUserData(userData)
        setLoginType(typeData)
        let reqData = {
            userId: userData.userInfo.userId,
            userTypeId: userData.userInfo.userTypeId,
            requestUserTypeId: typeData == "Mentor" ? 3 : 2,
            limit: limit.toString(),
            offset: 1,
        }
        let responseData = await MiddlewareCheck("getMentorMenteesProfile", reqData, props);
        console.log("responseData", JSON.stringify(responseData))
        if (responseData) {
            if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let profileData = modDashboardData(responseData.data)

                setMenteeAndMentorProfileArr(profileData)
            } else {
                Toaster.ShortCenterToaster(responseData.responseData)
            }
            setPageLoader(false)
        }
    }

    const onBookMark = async (userId, bookmarkUser) => {
        let reqData = {
            userId: userData.userInfo.userId,
            userTypeId: userData.userInfo.userTypeId,
            requestUserId: userId
        }
        if (bookmarkUser == 0) {
            let responseData = await MiddlewareCheck("addBookmarkUser", reqData, props)
            if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await _onload()
                Toaster.ShortCenterToaster(responseData.message);
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        } else {
            let responseData = await MiddlewareCheck("deleteBookmarkUser", reqData, props);
            if (responseData.respondcode == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await _onload();
                Toaster.ShortCenterToaster(responseData.message);
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
    }
    const commonfunction = (university) => {
        let tempUniversity = [];
        for (let i = 0; i < university.length; i++) {
            tempUniversity.push(university[i].name)
        }
        return tempUniversity.toString();
    }
    const _onProfile = (userId) => {
        props.navigation.navigate("ProfileView", { userId: userId, reloadRequests: _onload })
    }

    const _onRenderData = (item, key) => {
        return (
            <TouchableOpacity style={styles.profileTab} key={key} activeOpacity={0.9} onPress={() => _onProfile(item.item.userId)}>
                <View style={{ margin: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        {item.item.profileImgUrl == "" ?
                            <View style={styles.defaultProfile}>
                                <Image source={ImageName.PROFILE_ICON} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                            </View> :
                            <>
                                <View style={{ height: 70, width: 70, borderRadius: 120 }}>
                                    <Image source={{ uri: App_uri.IMAGE_VIEW_URI + item.item.profileImgUrl }} style={styles.profileImg} />
                                </View>
                            </>
                        }
                        <View style={{ flex: 1 }} />
                        {
                            loginType == "Mentor" ?
                                null :
                                <TouchableOpacity activeOpacity={0.7} onPress={() => onBookMark(item.item.userId, item.item.bookmarkUser)}>
                                    {
                                        item.item.bookmarkUser ?
                                            <Image source={ImageName.YELLOW_TONE} style={styles.bookMarkIcon} />
                                            :
                                            <Image source={ImageName.TWO_TONE} style={styles.bookMarkIcon} />
                                    }
                                </TouchableOpacity>
                        }

                    </View>
                    <View style={styles.countryEmojiSec}>
                        <View style={styles.countryEmojiSubSec}>
                            <TextComponent text={item.item.countryEmoji} additionalStyles={{ height: 20, width: 20 }} />
                        </View>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <TextComponent text={item.item.name} additionalStyles={styles.profileName} props={this.props} numberOfLines={1} />
                        <TextComponent text={loginType == "Mentor" ? item.item.expectedGraduation : commonfunction(item.item.universityData)} additionalStyles={styles.profileUniversity} props={this.props} numberOfLines={1} />
                        <TextComponent text={item.item.degree + ","} additionalStyles={styles.profileDegreeField} props={this.props} numberOfLines={1} />
                        <TextComponent text={item.item.field} additionalStyles={styles.profileDegreeField} props={this.props} numberOfLines={1} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={{ width: Dimension.width, }}>
            {
                pageLoader ?
                    <View style={styles.loaderSec}>
                        <ActivityIndicator size="large" color={Color.COLOR.BLACK.PURE_BLACK} />
                    </View> :
                    <View style={{ marginRight: 15, justifyContent: 'center' }}>
                        {
                            menteeAndMentorProfileArr.length > 0 ?
                                <FlatList
                                    data={menteeAndMentorProfileArr}
                                    renderItem={(item) => _onRenderData(item)}
                                    keyExtractor={(item, key) => key}
                                    onEndReachedThreshold={0.1}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                />
                                :
                                <View style={styles.noProfileTextSec}>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{ height: 50, width: 50, resizeMode: 'contain', }} source={ImageName.SAD_LOGO} />
                                        <View style={{ position: 'absolute', bottom: -40 }}>
                                            <Image source={ImageName.NO_DATA_FOUND} style={{ height: 130, width: 130, resizeMode: 'contain' }} />
                                        </View>
                                    </View>
                                    <TextComponent text={`No ${loginType == "Mentor" ? "Mentees" : "Mentors"} matching profile`} additionalStyles={styles.noProfileText} props={this.props} />
                                </View>
                        }

                    </View>
            }
        </SafeAreaView>
    )
}

export default MentorMenteeMatchProfile;