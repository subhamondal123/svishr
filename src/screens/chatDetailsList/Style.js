import { StyleSheet } from 'react-native';
import { Color, Dimension, FontFamily, FontSize } from '../../enums';

const styles = StyleSheet.create({
    container: {
        height: Dimension.height,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        flex: 1
    },
   
    loaderSec: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    noREquestSec: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimension.height / 1.5
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    imageGroup2: {
        height: 95,
        width: 95,
        resizeMode: 'contain'
    },
    imageGroup1: {
        height: 120,
        width: Dimension.width / 1.5,
        resizeMode: 'contain',
        top: -18

    },
    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        paddingBottom: 30,
        borderRadius: 18,
        maxHeight: Dimension.height,
        width: Dimension.width - 60,
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        alignSelf: 'center',
    },
    headerSec: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '6%',
        marginVertical: "5%",
    },
    chatPersonName: {
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        color: "#2f807f"
    },
    backImg: {
        height: 22,
        width: 22,
        resizeMode: 'contain'
    },
    threeDotImg: {
        height: 25,
        width: 10,
        resizeMode: 'cover'
    },
    deleteHeaderSec: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: '5%'
    },
    deleteConversonTxt: {
        fontSize: FontSize.MD,
        color: Color.COLOR.BLACK.PURE_BLACK,
        marginTop: 15,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM
    },
    deleteTitleTxt: {
        fontSize: FontSize.SM,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.OPENSANS.REGULAR
    },
    cancleDeleteSec: {
        marginTop: 18,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '8%'
    },
    cancleTxt: {
        fontSize: FontSize.XS,
        color: "#369090",
        marginTop: 15,
        fontFamily: FontFamily.FONTS.OPENSANS.BOLD
    },
    deleteTxt: {
        fontSize: 14,
        color: "#b41600",
        marginTop: 15,
        fontFamily: FontFamily.FONTS.OPENSANS.BOLD
    },
    chatLeftSec: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 80

    },
    chatLeftSubSec: {
        backgroundColor: '#008080',
        paddingVertical: 5,
        marginVertical: 5,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    leftChatMsg: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        fontSize: FontSize.XS
    },
    leftChatTime: {
        color: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        fontSize: FontSize.XXS
    },
    chatRightSec: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 80
    },
    chatRightSubSec: {
        backgroundColor: '#EBEAEA',
        paddingVertical: 5,
        marginVertical: 5,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    rightChatMsg: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        fontSize: FontSize.XS
    },
    rightChatTime: {
        color: Color.COLOR.GRAY.DARK_GRAY_COLOR,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        fontSize: FontSize.XXS
    },
    noConversationTxt: {
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.OPENSANS.MEDIUM,
        color: "#2f807f"
    },
    inputStyle: {
        fontSize: 14,
        color: '#000',
        height: 40,
        borderRadius: 12,
        backgroundColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        width: '70%',
        paddingHorizontal:"5%"//

    },
    sendSec: {
        backgroundColor: "#2f807f",
        height:50,
        width:50,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent:'center',
        
    },
    sendImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    inputBoxContainer: {
        flex: 1, 
        height: Dimension.height / 15, 
        backgroundColor: 'white',
        flexDirection: "row",//
        borderRadius: 10,
        marginHorizontal: "8%",
    },
    footer: {
        alignItems: 'center',
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height / 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',//
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#EEFAF8"
    },
});
export default styles;
