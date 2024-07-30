import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../../enums";
const styles = StyleSheet.create({
    container: {
        height: Dimension.height,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    titleText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        fontSize: FontSize.LG,
        textAlign: "center"
    },
    profileUploadTab: {
        backgroundColor: '#E3F9F8',
        borderRadius: 100,
        height: 160,
        width: 160,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 90
    },
    loaderSec: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgStyle: {
        height: 150,
        width: 150,
        borderRadius: 100,
        resizeMode: 'cover'
    },
    errorMsgText: {
        color: Color.COLOR.RED.AMARANTH,
        marginTop: 5,
        fontFamily: FontFamily.FONTS.OPENSANS.SEMI_BOLD,
        fontSize: FontSize.XS
    },
    avaterTitleText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.OPENSANS.SEMI_BOLD,
        fontSize: FontSize.XS
    },
    avaterText: {
        color: '#008080',
        fontFamily: FontFamily.FONTS.OPENSANS.SEMI_BOLD,
        fontSize: FontSize.XS
    }
})
export default styles;