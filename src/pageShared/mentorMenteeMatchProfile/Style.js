import { StyleSheet } from "react-native"
import { Color, Dimension, FontFamily, FontSize } from "../../enums"

const styles = StyleSheet.create({
    bookMarkIcon: {
        height: 16,
        width: 16,
        resizeMode: 'contain',
    },
    loaderSec: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    noProfileTextSec: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimension.height / 5
    },
    noProfileText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        color: Color.COLOR.BLACK.PURE_BLACK,
    },
    profileTab: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height / 3.8,
        width: Dimension.width / 2,
        borderRadius: 10,
        marginTop: 10,
        marginRight: 10,
        elevation: 1,
        borderColor: '#e6e6e6',
        borderWidth: 0.6,
    },
    defaultProfile: {
        height: 70,
        width: 70,
        borderRadius: 120,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: Color.COLOR.GRAY.GRAY_COLOR
    },
    profileImg: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
        borderRadius: 100
    },
    countryEmojiSec: {
        position: 'absolute',
        justifyContent: 'center',
        marginLeft: 40,
        top: -5
    },
    countryEmojiSubSec: {
        alignItems: 'center',
        height: 20,
        width: 25,
        flex: 1,
        justifyContent: 'center'
    },
    profileName: {
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        color: "#2f807f",
    },
    profileUniversity: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        color: Color.COLOR.BLACK.PURE_BLACK,
        marginTop: 5
    },
    profileDegreeField: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        color: "#7D7E7E"
    },
})
export default styles