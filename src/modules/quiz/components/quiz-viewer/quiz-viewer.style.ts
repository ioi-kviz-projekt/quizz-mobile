import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    loadingContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 40,
    },
    backContainer: {
        marginTop: 420,
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
    },
    loadingSpinner: {
        transform: [{ scale: 2 }],
        height: 60,
    },
    timerContainer: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 40,
    },
});
