import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
        // flex: 1,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 100,
        // backgroundColor: 'red'
    },
    buttonImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
});


export default styles;