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
        marginTop: 80,
        marginBottom: 60,
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
    },
    firstInput: {
        marginTop: 20,
    },
    secondInput: {
        marginTop: 60,
    },
    button: {
        marginTop: 80,
    },
});
