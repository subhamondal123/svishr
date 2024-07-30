import { StyleSheet } from "react-native"
import { Color, Dimension, FontFamily, FontSize } from "../../../enums"

const styles = StyleSheet.create({
    container: {
        height: Dimension.height,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        flex: 1
    },
    labelText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: "#008080",
        marginTop: 15
    },
    errorMsgText: {
        color: Color.COLOR.RED.AMARANTH,
        fontFamily: FontFamily.FONTS.OPENSANS.SEMI_BOLD,
        fontSize: FontSize.XS,
        marginLeft: 20,
        marginTop: 5
    },
    titleText: {
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        color: Color.COLOR.BLACK.PURE_BLACK,
        marginTop: 25
    },
    orTextSec: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: "10%",
        marginTop: "5%"
    },
    viewStyle: {
        borderBottomColor: Color.COLOR.GRAY.GRAY_COLOR,
        flex: 1,
        borderBottomWidth: 1
    },
    orText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: Color.COLOR.BLACK.PURE_BLACK
    },
    googleSIgnInSec: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%'
    },
    imgStyle: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    loginSec: {
        alignItems: 'center',
        marginTop: "8%",
        flexDirection: 'row',
        justifyContent: 'center'
    },
    alreadyAccText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: Color.COLOR.BLACK.PURE_BLACK
    },
    loginText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: "#008080"
    },
    menteeImgSec: {
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
export default styles