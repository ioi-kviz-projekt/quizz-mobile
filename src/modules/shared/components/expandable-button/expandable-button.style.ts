import { StyleSheet } from "react-native";
import { Color } from "../../../../styles";
import { BUTTON_RADIUS } from "../button";

export const style = StyleSheet.create({
    button: {
        borderRadius: BUTTON_RADIUS,
        width: 270,
    },
    expandedTextContainer: {
    
    },
    expandedText: {
        color: Color.BLACK,
        fontSize: 16,
        fontWeight: "bold",
    },
});
