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
        textAlign: "center"
    },
    scrollSec: {
        backgroundColor: '#e6f3f3',
        borderRadius: 12,
        height: Dimension.height / 2.1,
        marginTop: '8%',
        borderColor: "#2f807f",
        borderWidth: 0.8,
        position: 'relative'
    },
    items: {
        borderWidth: 1,
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderColor: '#008080',
        marginHorizontal: 5,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemsText: {
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        fontSize: FontSize.XS
    },
    errorMsgText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: Color.COLOR.RED.AMARANTH,
        marginTop: 5
    },
})
export default styles;