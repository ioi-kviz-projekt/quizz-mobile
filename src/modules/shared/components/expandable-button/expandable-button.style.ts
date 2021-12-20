import { StyleSheet } from "react-native";
import { Color } from "../../../../styles";
import { BUTTON_RADIUS } from "../button";

export const style = StyleSheet.create({
    button: {
        borderRadius: BUTTON_RADIUS,
        width: 270,
        backgroundColor: Color.WHITE,
        minHeight: 210,
    },
    expandedTextContainer: {
        paddingHorizontal: 15,
        paddingBottom: 25,
        paddingTop: 15,
    },
    expandedText: {
        color: Color.BLACK,
        fontSize: 16,
        fontWeight: "bold",
    },
});
