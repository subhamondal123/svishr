import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Dimension } from '../../enums';

const styles = StyleSheet.create({
    container: {
        height: Dimension.height,
        flex: 1,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    profileTabSec: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: '3%',
        elevation: 2,
        borderColor: '#e6e6e6',
        marginBottom: 5
    },
    defaultProfileImgSec: {
        height: 60,
        width: 60,
        borderRadius: 120,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: Color.COLOR.GRAY.GRAY_COLOR
    },
    profileImgSec: {
        height: 70,
        width: 70,
        borderRadius: 100,
        elevation: 2
    },
    profileImg: {
        height: 70,
        width: 70,
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
        justifyContent: 'center',
    },
    profileName: {
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        color: "#2f807f"
    },
    profileUniversity: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        marginTop: 5,
        color: Color.COLOR.BLACK.PURE_BLACK,
    },
    profileDetails: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        color: "#7D7E7E",
        marginTop: 2
    },
    loaderSec: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    mainView: {
        marginHorizontal: '3%',
        marginTop: 10,
        marginBottom: 100
    },
    savedBookmarkText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        marginTop: 10,
        marginLeft: '3%',
        marginBottom: 5
    },
    noBookmarkSec: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimension.height / 1.5
    }

})

export default styles;