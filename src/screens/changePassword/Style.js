import { StyleSheet } from "react-native"
import { Color, Dimension, FontFamily, FontSize } from "../../enums"
const styles = StyleSheet.create({
    container: {
        height: Dimension.height,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    headerSec: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: '6%'
    },
    labelText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: "#008080",
    },
    errorText: {
        color: Color.COLOR.RED.AMARANTH,
        fontFamily: FontFamily.FONTS.OPENSANS.SEMI_BOLD,
        fontSize: FontSize.XS,
        marginLeft: 20,
        marginTop: 5
    },
    changePassText: {
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.OPENSANS.REGULAR,
        color: Color.COLOR.BLACK.PURE_BLACK
    }

})
export default styles