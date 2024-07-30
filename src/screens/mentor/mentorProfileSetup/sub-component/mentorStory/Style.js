import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../../enums";
const styles = StyleSheet.create({
    container: {
        height: Dimension.height,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    titleTextSec: {
        alignItems: 'center',
        marginHorizontal: '8%',
        marginTop: '5%',
    },
    titleText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        fontSize: FontSize.LG,
        textAlign: "center"
    },
    inputSec: {
        justifyContent: 'center',
        height: Dimension.height / 2.2,
        marginTop: "8%",
        elevation: 1,
        borderRadius: 5,
        flexDirection: 'row',
        borderColor: "#4F9F9A",
    },
    inputStyle: {
        color: "#479690",
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        paddingVertical: 15,
        includeFontPadding: false,
        height: Dimension.height / 2.1,
        width: Dimension.width / 1.3,
        paddingHorizontal: 15,
        textAlignVertical: "top"
    },
    errorMsgText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: Color.COLOR.RED.AMARANTH,
        marginTop: 5
    },
    countText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontFamily: FontFamily.FONTS.OPENSANS.REGULAR,
        fontSize: FontSize.XS
    }

})
export default styles;