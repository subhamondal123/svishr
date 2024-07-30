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
    labelText: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontFamily: FontFamily.FONTS.OPENSANS.REGULAR,
        fontSize: FontSize.XS
    },
    errorTextMsg: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: Color.COLOR.RED.AMARANTH,
        marginTop: 5,
        marginLeft: 20
    },
    universityList: {
        borderWidth: 1,
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderColor: '#008080',
        backgroundColor: "#2f807f",
        marginHorizontal: 5,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    universityText: {
        color: "#fff",
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        fontSize: FontSize.XS
    },
})
export default styles;