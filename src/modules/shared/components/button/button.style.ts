import { StyleSheet } from "react-native";
import { Color } from "../../../../styles";

export const BUTTON_RADIUS = 25;

export const style = StyleSheet.create({
    button: {
        borderRadius: BUTTON_RADIUS,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 25,
        width: 270,
    },
    buttonTypePrimary: {
        backgroundColor: Color.GREEN,
    },
    buttonTypeSecondary: {
        backgroundColor: Color.WHITE,
    },
    buttonTypeDanger: {
        backgroundColor: Color.RED,
    },
    buttonText: {
        fontSize: 30,
        fontWeight: "500",
    },
    buttonTypePrimaryText: {
        color: Color.BLACK,
    },
    buttonTypeSecondaryText: {
        color: Color.BLACK,
    },
    buttonTypeDangerText: {
        color: Color.WHITE,
    },
});
