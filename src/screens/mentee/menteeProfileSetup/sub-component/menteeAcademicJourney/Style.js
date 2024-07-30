import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../../enums";
const styles = StyleSheet.create({
    container: {
        height: Dimension.height,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    loaderSec: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    titleText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        fontSize: FontSize.LG,
        textAlign: "center",
        marginTop: '5%'
    },
    labelText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: Color.COLOR.GRAY.GRAY_TINTS,
    },
    errorMsgText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: Color.COLOR.RED.AMARANTH,
        marginTop: 5,
        marginLeft: 20
    }
})
export default styles;