import { Platform, StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Dimension } from '../../enums';

const styles = StyleSheet.create({
    mainView: {
        height: Dimension.height,
        flex: 1,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    defaultProfileImgSec: {
        height: 60,
        width: 60,
        borderRadius: 120,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: Color.COLOR.GRAY.GRAY_COLOR
    },
    defaultProfileImg: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    profileImgSec: {
        height: 70,
        width: 70,
        borderRadius: 100,
        elevation: 2
    },
    profileImg: {
        height: 70,
        width: 70,
        resizeMode: 'contain',
        borderRadius: 100
    },
    listTab: {
        backgroundColor: "#f6f6f6",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: '3%',
        elevation: Platform.OS == "ios" ? 4 : 2,
        borderColor: '#e6e6e6',
        borderWidth: 0.3,
        marginBottom: 5
    },
    emojiSec: {
        position: 'absolute',
        justifyContent: 'center',
        marginLeft: 40,
        top: -5
    },
    emojiSubSec: {
        alignItems: 'center',
        height: 20,
        width: 25,
        flex: 1,
        justifyContent: 'center',
    },
    profileName: {
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        color: "#2f807f",
        marginTop: 5
    },
    profileUniversity: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        marginTop: 5,
        color: Color.COLOR.BLACK.PURE_BLACK,
    },
    profiledegree: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        marginTop: 2,
        color: "#7D7E7E",
    },
    loaderSec: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    allFriendsText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        marginTop: 10,
        marginLeft: '3%',
        marginBottom: 5
    },
    noDataFoundSec: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimension.height / 1.5
    }

})

export default styles;