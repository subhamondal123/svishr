import { StyleSheet } from "react-native"
import { Color, Dimension, FontFamily, FontSize } from "../../enums"

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#fff',
        height: Dimension.height
    },
    headerSec: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        justifyContent: 'center',
        marginTop: 30,
        paddingBottom: 10
    },
    welcomeText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        color: Color.COLOR.BLACK.PURE_BLACK
    },
    tabButtonSec: {
        marginTop: 22,
        marginLeft: 18,
        height: 125,
        width: Dimension.width / 1.3,
        backgroundColor: '#2f807f',
        borderRadius: 16,
    },
    tabButtonText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        color: Color.COLOR.WHITE.PURE_WHITE
    },
    matchProfileText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        color: "#2f807f"
    },
    similarBgText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        color: Color.COLOR.BLACK.PURE_BLACK
    },
    loaderSec: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },


})
export default styles