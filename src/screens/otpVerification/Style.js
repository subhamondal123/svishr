import { StyleSheet } from "react-native"
import { Color, Dimension, FontFamily, FontSize } from "../../enums"
const styles = StyleSheet.create({
    container: {
        height: Dimension.height,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        flex: 1
    },
    pinCodeContainer: {
        height: 55,
        width: 55,
        borderRadius: 16,
        backgroundColor: '#e7f5f5'
    },

    pinCodeText: {
        color: '#008080',
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM
    },
    resendTextSec: {
        alignItems: 'center',
        marginTop: '50%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    titleText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        fontSize: FontSize.LG,
    },
    sendTitleText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.OPENSANS.REGULAR,
        fontSize: FontSize.SM
    },
    mailText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.OPENSANS.BOLD,
        fontSize: FontSize.SM
    },
    errorMsgText: {
        color: Color.COLOR.RED.AMARANTH,
        fontFamily: FontFamily.FONTS.MONTSERRAT.SEMI_BOLD,
        fontSize: FontSize.XS,
        marginTop: 30
    },
    recivedText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.MONTSERRAT.SEMI_BOLD,
        fontSize: FontSize.XS
    },
    resendText: {
        fontFamily: FontFamily.FONTS.MONTSERRAT.SEMI_BOLD,
        fontSize: FontSize.XS
    }

})
export default styles