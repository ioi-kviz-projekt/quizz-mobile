import { StyleSheet } from "react-native";
import { Color } from "../../../../styles";

export const style = StyleSheet.create({
    overlay: {
        width: "80%",
        padding: 0,
        borderRadius: 25,
    },
    container: {
        backgroundColor: Color.WHITE,
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    actionsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    cancelActionContainer: {
        padding: 8,
    },
    contentContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
});
