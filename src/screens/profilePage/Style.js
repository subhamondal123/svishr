import { Platform, StyleSheet } from "react-native"
import { Color, Dimension, FontFamily, FontSize } from "../../enums"

const styles = StyleSheet.create({
    container: {
        height: Dimension.height,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        flex: 1
    },
    switchContainer: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    switch: {
        transform: Platform.OS == "ios" ? [{ scaleX: 1 }, { scaleY: 1 }] : [{ scaleX: 1.5 }, { scaleY: 1.5 }],  // Adjust scale as needed
    },
    loader: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    editSec: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: '10%',
        marginTop: 25
    },
    headerTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        fontSize: FontSize.MD
    },
    edit: {
        backgroundColor: '#008080',
        padding: 5,
        paddingHorizontal: 18,
        borderRadius: 20
    },
    editTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        fontSize: FontSize.XS
    },
    profileSec: {
        alignItems: 'center',
        marginTop: "10%",
        backgroundColor: '#E3F9F8',
        height: 190,
        width: 190,
        borderRadius: 100,
        justifyContent: 'center'
    },
    profileImg: {
        height: 180,
        width: 180,
        resizeMode: 'cover',
        borderRadius: 100
    },
    discoverableSec: {
        alignItems: 'flex-end',
        flex: 1,
        marginHorizontal: '10%'
    },
    discoverableTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.OPENSANS.REGULAR,
        fontSize: FontSize.XS
    },
    personalInfo: {
        backgroundColor: "#e5f2f2",
        paddingHorizontal: "8%",
        paddingVertical: 10,
        marginTop: 25
    },
    personalInfoTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        fontSize: FontSize.SM
    },
    profieldFieldSec: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 15
    },
    fieldTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        fontSize: FontSize.XS
    },
    fieldValueTxt: {
        color: "#008080",
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        fontSize: FontSize.XS,
        textAlign: "left"
    },
    academicInfo: {
        backgroundColor: "#e5f2f2",
        paddingHorizontal: "8%",
        paddingVertical: 10,
        marginTop: 20
    },
    academicInfoTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        fontSize: FontSize.SM
    },
    accountInfo: {
        backgroundColor: "#e5f2f2",
        paddingHorizontal: "8%",
        paddingVertical: 10,
        marginTop: 20
    },
    accountInfoTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        fontSize: FontSize.SM
    }

})
export default styles