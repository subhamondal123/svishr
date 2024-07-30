import { StyleSheet } from "react-native";
import { Color, Dimension } from "../../../enums";
const styles = StyleSheet.create({
    container: {
        height: Dimension.height,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        flex: 1
    },
    gradientSec: {
        height: Dimension.height / 2 - 120,
        justifyContent: 'center',
        width: Dimension.width
    },
    playProgressBtnSec: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: 100,
        width: 100,
        alignItems: 'center',
        borderRadius: 100,
        justifyContent: 'center'
    }
})
export default styles;