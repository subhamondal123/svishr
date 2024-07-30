import { StyleSheet } from "react-native";
import { Dimension, FontFamily } from "../../enums";
const styles = StyleSheet.create({
    container: {
        height: Dimension.height,
        flex: 1
    },
    splashImgSec: {
        justifyContent: 'center',
        alignItems: 'center', flex: 1
    },
    splashImg: {
        height: 180,
        width: 180,
        resizeMode: 'contain'
    },
    svishrText: {
        fontSize: 28,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        color: "#F9F9F9"
    }
})
export default styles;