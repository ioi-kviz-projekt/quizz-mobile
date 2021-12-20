import { StyleSheet } from "react-native";
import { Color } from "../../../../styles";

export const style = StyleSheet.create({
    titleArea: {
        backgroundColor: Color.GREEN,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingVertical: 25,
    },
    titleAreaText: {
        textAlign: "center",
        color: Color.BLACK,
        fontSize: 32,
        fontWeight: "600",
    },
});
