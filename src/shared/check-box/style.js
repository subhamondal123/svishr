import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color } from '../../enums/';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    radioCircleOutCheck: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    checkMarkImg: {
        alignItems: 'center',
        resizeMode:'contain',
        height:20,
        width:20
    },
    radioCircleTickView: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
})

export default styles;