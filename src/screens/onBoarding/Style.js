import { StyleSheet } from "react-native"
import { Color, Dimension, FontFamily, FontSize } from "../../enums"
const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: "white",

        alignItems: "center",
        height: Dimension.height,

    },
    ImageContainer: {
        marginTop: 40,
        backgroundColor: "pink",

    },
    TextContainer: {
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20


    },
    ButtonContainer: {
        flex: 1,
        marginHorizontal: "10%"
    },
    container: {
        height: Dimension.height,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        flex: 1
    },
    skipSec: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    },
    titleText: {
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.MONTSERRAT.REGULAR,
        color: Color.COLOR.BLACK.PURE_BLACK
    },
    titleSummeryText: {
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.OPENSANS.REGULAR,
        color: Color.COLOR.BLACK.PURE_BLACK,
        marginTop: 30
    },
})
export default styles