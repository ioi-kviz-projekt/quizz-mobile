import { StyleSheet } from "react-native";
import { Color } from "../../../../styles";

export const style = StyleSheet.create({
    container: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: Color.BLACK,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: Color.BLACK,
        fontSize: 30,
        fontWeight: "700",
    },
});
