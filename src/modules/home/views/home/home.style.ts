import { StyleSheet } from "react-native";
import { Color } from "../../../../styles";

export const style = StyleSheet.create({
    content: {
        marginTop: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
    },
    firstButton: {
        marginBottom: 50,
    },
    logoutButton: {
        marginTop: 50,
    },
    
    popupContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    popupText: {
        textAlign: "center",
        fontSize: 24,
        color: Color.BLACK,
        marginBottom: 20,
    },
});
