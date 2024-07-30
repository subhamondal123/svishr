import { StyleSheet } from "react-native"
import { Color, Dimension, FontFamily, FontSize } from "../../enums"
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        height: Dimension.height,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },

    marginSec: {
        marginHorizontal: '5%',
        marginTop: 25
    },

    svishrText: {
        color: '#008080',
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        fontSize: FontSize.XXXL
    },

    imageSec: {
        width: Dimension.width,
        height: Dimension.height / 2,
        marginTop: 25
    },

    rowSec: {
        marginHorizontal: '5%',
        flexDirection: 'row'
    },

    platfromText: {
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: Color.COLOR.GRAY.DAVY_GRAY
    },

    chooseJourneyText: {
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        color: Color.COLOR.WHITE.PURE_WHITE
    },

    buttonView: {
        marginTop: 40,
        flexDirection: 'row',
        marginHorizontal: '15%'
    },

    logInSec: {
        // marginTop: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },

    accountText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: Color.COLOR.BLACK.PURE_BLACK
    },

    logInText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.OPENSANS.REGULAR,
        fontSize: FontSize.XS
    },

})
export default styles