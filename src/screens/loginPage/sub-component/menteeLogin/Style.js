
import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../enums";
const styles = StyleSheet.create({
    containStyle: {
        height: Dimension.height,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    emailText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: "#008080",
        marginTop: 15
    },
    emailErrorText: {
        color: Color.COLOR.RED.AMARANTH,
        fontFamily: FontFamily.FONTS.OPENSANS.SEMI_BOLD,
        fontSize: FontSize.XS,
        marginLeft: 20,
        marginTop: 5
    },
    passwordText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: "#008080",
        marginTop: 15
    },
    passwordErrorText: {
        color: Color.COLOR.RED.AMARANTH,
        fontFamily: FontFamily.FONTS.OPENSANS.SEMI_BOLD,
        fontSize: FontSize.XS,
        marginLeft: 20,
        marginTop: 5
    },
    forgotPassText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.OPENSANS.REGULAR,
        color: Color.COLOR.GRAY.GRAY_COLOR,
        textDecorationLine: "underline"
    },
    orTextSec: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: "10%",
        marginTop: "5%"
    },
    orText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: Color.COLOR.BLACK.PURE_BLACK
    },
    singleView: {
        borderBottomColor: Color.COLOR.GRAY.GRAY_COLOR,
        flex: 1,
        borderBottomWidth: 1
    },
    googleLoginSec: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%'
    },
    registerSec: {
        alignItems: 'center',
        marginTop: "8%",
        flexDirection: 'row',
        justifyContent: 'center'
    },
    registerQueteText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: Color.COLOR.BLACK.PURE_BLACK
    },
    registerText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: "#008080"
    },
    menteeLoginImgSec: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        bottom: 0,
        marginTop: 10
    }

})
export default styles