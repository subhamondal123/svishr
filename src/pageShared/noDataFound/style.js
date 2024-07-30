import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Dimension } from '../../enums/';

const styles = StyleSheet.create({
    container: {
    },
    textContainer: {
        marginTop: "26%",
        right: "20%",
    },
    text: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontFamily: FontFamily.FONTS.MONTSERRAT.SEMI_BOLD,
        fontSize: FontSize.XL,
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
    additionalTextContainer: {
        bottom: "13%",


    },
    additionalText: {
        color: "red",
        textAlign: 'center',
        fontSize: FontSize.MD
    },
})

export default styles;