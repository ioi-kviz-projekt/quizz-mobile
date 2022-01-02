import { StyleSheet } from "react-native";
import { Color } from "../../../../../styles";

export const style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 120,
    },
    scorebox: {
        borderRadius: 25,
        backgroundColor: Color.GREEN,
        padding: 25,
        width: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 120,
    },
    scoreboxText: {
        color: Color.BLACK,
        fontSize: 42,
        fontWeight: "700",
    },
});
