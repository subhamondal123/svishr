import { StyleSheet } from "react-native"
import { Color, Dimension, FontFamily, FontSize } from "../../enums"

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#fff',
        height: Dimension.height
    },
    loader: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    profileImg: {
        height: 80,
        width: 80,
        resizeMode: 'contain',
        borderRadius: 100
    },
    profileImgSec: {
        elevation: 2,
        height: 80,
        width: 80,
        borderRadius: 100,
        justifyContent:'center',
        alignItems:'center'
    },
    profileName: {
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        color: Color.COLOR.BLACK.PURE_BLACK
    },
    profileUnivName: {
        fontSize: FontSize.SM,
        color: "#2f807f",
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR
    },
    bookMarkIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
    profileInfoSec: {
        marginTop: 10,
        marginHorizontal: '5%',
        marginBottom: 200
    },
    profileInfoFieldTxt: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        color: Color.COLOR.BLACK.PURE_BLACK,
    },
    profileInfoValueTxt: {
        fontSize: FontSize.XS,
        color: "#2f807f",
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM
    },
    hobbiesSec: {
        borderRadius: 16,
        borderColor: "#2f807f",
        borderWidth: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        padding: 4,
        marginTop: 12,
    },
    hobbiesName: {
        fontSize: FontSize.XS,
        color: "#2f807f",
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM
    },
    bioTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM
    },
    requestBtnSec: {
        position: 'absolute',
        bottom: 0,
        width: Dimension.width,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    loaderSec: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    countryEmojiSec: {
        position: 'absolute',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    buttonLoader: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
})
export default styles