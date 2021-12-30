import { StyleSheet } from "react-native";
import { Color } from "../../../../styles";

export const style = StyleSheet.create({
    titleText: {
        fontSize: 26,
    },
    container: {
        paddingBottom: 20,
    },
    input: {
        height: 220,
    },
    inputInner: {
        borderRadius: 20,
        backgroundColor: Color.WHITE,
        height: 200,
        fontSize: 18,
        color: Color.BLACK,
        display: "flex",
        textAlignVertical: "top",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    firstInput: {
        marginTop: 40,
        marginBottom: 40,
    },
});
