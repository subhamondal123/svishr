import { StyleSheet } from "react-native"
import { Color, Dimension, FontFamily, FontSize } from "../../enums"

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#fff',
        height: Dimension.height
    },
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingBottom: 30,
        borderRadius: 18,
        maxHeight: Dimension.height,
        width: Dimension.width - 60,
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        alignSelf: 'center',
    },
    loaderSec: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    noREquestSec: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimension.height / 1.5
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
    defaultImg: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    profileImgSec: {
        height: 60,
        width: 60,
        borderRadius: 100,
        elevation: 2
    },
    profileImg: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
        borderRadius: 100
    },
    chatHeaderTxt: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        color: Color.COLOR.BLACK.PURE_BLACK
    },
    chatListTab: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '5%'
    },
    chatListName: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: Color.COLOR.BLACK.PURE_BLACK
    },
    chatMsg: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.MONTSERRAT.SEMI_BOLD,
        color: Color.COLOR.YELLOW.SELECTIVE
    },
    timeTxt: {
        fontSize: FontSize.XS,
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontFamily: FontFamily.FONTS.OPENSANS.REGULAR
    },
    chatCountSec: {
        backgroundColor: Color.COLOR.YELLOW.SUNGLOW,
        borderRadius: 100,
        width: 20,
        height: 20,
        alignItems: 'center'
    },
    chatCount: {
        fontSize: FontSize.XS,
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.OPENSANS.REGULAR
    }


})
export default styles