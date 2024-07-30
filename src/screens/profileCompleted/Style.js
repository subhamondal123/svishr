import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Dimension } from '../../enums';

const styles = StyleSheet.create({
    mainView: {
        height: Dimension.height,
        flex: 1,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    container: {
        height: Dimension.height,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        flex: 1
    },
    textSec: {
        marginHorizontal: '10%',
        marginTop: 70,
        alignItems: 'center'
    },
    hoorayText: {
        fontFamily: FontFamily.FONTS.MONTSERRAT.BOLD,
        fontSize: FontSize.XL,
        color: '#008080'
    },
    hoorayImg: {
        width: Dimension.width,
        height: 280,
        resizeMode: 'contain',
        marginTop: 40
    },
    titleText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        fontSize: FontSize.SM,
        marginTop: 50
    },
    titleSummeryText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        fontSize: FontSize.SM, marginTop: 50, textAlign: "center"
    },
    btnSec: {
        marginTop: 50,
        marginHorizontal: '15%',
        marginBottom: 10
    },
})

export default styles;