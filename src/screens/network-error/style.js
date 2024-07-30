import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Padding, Dimension } from '../../enums';
import singleton from "../../enums/dimensions";


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        height: Dimension.height
    },
    bgimage: {
        flex: 1,
        justifyContent: "center",
        resizeMode: "cover",
        opacity: .9,
        height: singleton.height,
        width: singleton.width,
    },
    logoSec: {
        alignItems: 'center',
        // marginTop:"30%",
        justifyContent: 'center'

    },
    logoImg: {
        height: 100,
        width: 100,
        resizeMode: 'contain'
    },
    section: {
        marginLeft: '10%',
        marginRight: '10%',
        // marginTop: '1%'
    },
    errorText: {
        fontSize: 30,
        fontFamily: FontFamily.FONTS.MONTSERRAT.SEMI_BOLD,
        // fontWeight: 'bold',
        color: Color.COLOR.BLACK.BLACK_PEARL
    },
    errorTextMsg: {
        fontSize: 14,
        fontFamily: FontFamily.FONTS.MONTSERRAT.MEDIUM,
        // fontWeight: 'bold',
        color: Color.COLOR.BLACK.BLACK_PEARL
    },
    btn: {
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 1,
        padding: 10,
        marginTop: '20%',
    },
    btnText: {
        alignSelf: 'center',
        color: '#01a3a4'
    },
    imgStyle: {
        width: Dimension.width / 1.2,
        height: 450,
        resizeMode: 'contain'
    }
});

export default styles;