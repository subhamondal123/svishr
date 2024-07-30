import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, OtherSize, Padding, Dimension } from '../../enums';

const styles = StyleSheet.create({


    // Modal Section Start
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingBottom: 30,
        borderRadius: 12,
        maxHeight: Dimension.height,
        right: 0,
        left: 0,
        marginHorizontal: "10%"
    },

    otherText: {
        height: 40,
        padding: 10,
        borderRadius: 10,
        borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        borderWidth: 1,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
    },

    headerModalSec: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#993921',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    modalHeaderText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        alignSelf: 'center',
        marginTop: 5,
        flex: 1,
        marginLeft: '5%'
    },
    cancelSec: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        top: -5
    },
    cancelImg: {
        height: 12,
        width: 12,
        resizeMode: 'contain',
        alignItems: 'center'
    },
    modalmarginSec: {
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '10%'
    },
    modalHeaderSec: {
        backgroundColor: "#008080",
        paddingTop: 15,
        paddingBottom: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10

    },
    crossImgSec: {
        height: 30,
        width: 30,
        borderRadius: 20,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    redCrossImg: {
        height: 22,
        width: 22,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    headerModalText: {
        color: Color.COLOR.BLUE.CYAN_BLUE_AZURE,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        alignSelf: 'center',
        marginTop: '7%',
        fontSize: FontSize.MD,
        textAlign: 'center'
    },

    modalMainMarginSec: {
        // marginLeft: '5%',
        // marginRight: '5%',
        // marginBottom: '10%'
        margin: "5%",
        alignItems: 'center'
    },
    actionSec: {
        flexDirection: 'row',
        marginTop: 3,
        alignSelf: 'center'
    },
    containerStyle: {
        width: 40,
        height: 20,
        borderRadius: 13,
        padding: 5,
    },
    circleStyle: {
        width: 13,
        height: 13,
        borderRadius: 10,
    },

    cancelButton: {
        backgroundColor: Color.COLOR.RED.PURE_RED,
        // paddingBottom: 10,
        // paddingTop: 10,
        // paddingLeft: 15,
        // paddingRight: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal:15
        width: "30%",
        paddingVertical:10
    },
    logoutButton: {
        backgroundColor: "#008080",
        // paddingBottom: 10,
        // paddingTop: 10,
        // paddingLeft: 15,
        // paddingRight: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: "30%",
        paddingVertical:10
    },
    cancelText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
    },

    pageLoaderViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: '10%'
    }

})

export default styles;