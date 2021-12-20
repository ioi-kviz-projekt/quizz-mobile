import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    background: {
        flex: 1,
        // @ts-ignore
        width: null,
        // @ts-ignore
        height: null,
        resizeMode: "cover",
    },
    content: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    header: {
        marginTop: 120,
        marginBottom: 150,
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
    },
});
