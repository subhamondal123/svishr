import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Padding, Dimension } from '../../enums';

const styles = StyleSheet.create({

    container: {
        // flex: 1
    },


    headerOpen: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#C6EFED",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: "#E3F9F8",
        borderWidth: 1,

    },
    headerClosed: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#E3F9F8",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#479690",

    },
    headerBorder1: {
        borderWidth: 1,
        borderColor: "#E3F9F8",

    },
    headerBorder2: {
        borderWidth: 1,
        borderColor: "#479690",

    },
    dropdown: {
        borderWidth: 1,
        borderColor: "#E3F9F8",
        backgroundColor: 'white',
        marginHorizontal: ".25%",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    optionContainer: {
        width: '100%',
        marginVertical: 2,
        borderRadius: 20,
    },
    option: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5
    },
    optionText: {
        fontSize: 12,
        fontFamily: FontFamily.FONTS.OPENSANS.REGULAR,
        color: Color.COLOR.GRAY.DARK_GRAY_COLOR,
    },
    image: {
        height: 10,
        width: 10,
        paddingRight: 20,
    },
    headerText: {
        flex: 1,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.OPENSANS.SEMI_BOLD,
        color: Color.COLOR.GRAY.GRAY_TINTS,
    },
    headerText1: {
        flex: 1,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.OPENSANS.SEMI_BOLD,
        color: "#479690",
    },
    headerText2: {
        flex: 1,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.OPENSANS.SEMI_BOLD,
        color: Color.COLOR.GRAY.PHILIPPINE_GRAY,

    },
    headerText3: {
        flex: 1,
        fontSize: 12,
        fontFamily: FontFamily.FONTS.OPENSANS.SEMI_BOLD,
        color: "#479690",

    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    modalContent: {
        flex: 1,
        position: 'absolute',
        borderRadius: 10,
        width: '90%',
    },

});
export default styles;
