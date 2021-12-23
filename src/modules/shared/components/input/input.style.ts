import { StyleSheet } from "react-native";
import { border, Color } from "../../../../styles";


export const style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: 60,
    },
    input: {
        borderRadius: 20,
        backgroundColor: Color.WHITE,
        height: 60,
        fontSize: 16,
        color: Color.BLACK,
        width: "100%",
        display: "flex",
    },
    invalidInput: {
        ...border(2, Color.RED),
    },
    label: {
        fontSize: 25,
        color: Color.BLACK,
    },
    errorLabel: {
        fontSize: 25,
        color: Color.RED,
    },
    itemContainer: {
        width: "100%",
    },
});
