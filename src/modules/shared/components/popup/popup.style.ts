import { StyleSheet } from "react-native";
import { Color } from "../../../../styles";

export const style = StyleSheet.create({
    overlay: {
        width: "80%",
        borderRadius: 12,
        padding: 0,
    },
    container: {
        /*borderTopLeftRadius: 12,
        borderTopRightRadius: 12,*/
        backgroundColor: Color.WHITE,
        padding: 20,
    },
    actionsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    cancelActionContainer: {
        padding: 10,
    },
    contentContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
});
