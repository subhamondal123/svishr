import { StyleSheet } from "react-native"
import { Color, Dimension, FontFamily, FontSize } from "../../../../enums"
const styles = StyleSheet.create({
    containView: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        // borderWidth:1
    },

    buttonView: {
        marginTop: 30,
        marginHorizontal: '4%'
    },

    passwordText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: "#008080",
        marginTop: 15
    },

    emailText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: "#008080",
        marginTop: 15
    },

    forgotView: {
        marginTop: 25,
        alignItems: 'center'
    },

    register: {
        alignItems: 'center',
        marginTop: "8%",
        flexDirection: 'row',
        justifyContent: 'center'
    },

    forgotText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.OPENSANS.REGULAR,
        color: Color.COLOR.GRAY.GRAY_COLOR,
        textDecorationLine: "underline"
    },

    anAccountText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: Color.COLOR.BLACK.PURE_BLACK
    },

    registerText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: "#008080"
    },

    mentorImage: {
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'relative',
        bottom: 0
    },

    imageSec: {
        height: 300,
        resizeMode: 'contain'
    },
    errorMsgText: {
        color: Color.COLOR.RED.AMARANTH,
        fontFamily: FontFamily.FONTS.OPENSANS.SEMI_BOLD,
        fontSize: FontSize.XS,
        marginLeft: 20,
        marginTop: 5
    }




})
export default styles