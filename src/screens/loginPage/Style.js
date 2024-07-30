import { Platform, StyleSheet } from "react-native"
import { Color, Dimension, FontFamily, FontSize } from "../../enums"
const styles = StyleSheet.create({
    containView: {
        flex: 1,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height
    },

    tabSec: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },

    activeView: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingVertical: 12,
        paddingHorizontal: 52,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderWidth: 1,
        borderColor: '#008080',
        flexDirection: 'row',
        borderRightWidth: 0
    },

    imageTick: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    mentorTabSec: {
        width: "45%",
        height: "100%",
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderRightWidth: 0
    },
    mentorGradientSec: {
        paddingVertical: 15,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
    },
    tabTextSec: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 20
    },
    menteeTabSec: {
        width: "45%",
        height: "100%",
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderLeftWidth: 0
    },
    menteeGradientSec: {
        paddingVertical: 15,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    },
    tabText: {
        textAlign: 'center',
        fontFamily: FontFamily.FONTS.MONTSERRAT.SEMI_BOLD,
        fontSize: FontSize.XS,

    }




})
export default styles