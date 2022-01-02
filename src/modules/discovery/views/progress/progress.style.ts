import { StyleSheet } from "react-native";
import { Color } from "../../../../styles";

export const style = StyleSheet.create({
    titleText: {
        fontSize: 26,
    },
    container: {
        paddingBottom: 20,
    },
    contentContainer: {
        paddingBottom: 20,
    },
    inputContainer: {
        paddingHorizontal: 20,
    },
    input: {
        height: 220,
    },
    inputInner: {
        borderRadius: 20,
        backgroundColor: Color.WHITE,
        height: 200,
        fontSize: 18,
        color: Color.BLACK,
        display: "flex",
        textAlignVertical: "top",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    firstInput: {
        marginTop: 40,
        marginBottom: 40,
    },
    answerInput: {
        marginBottom: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    answerInputContainer: {
        flex: 1,
        marginRight: 8,
        marginLeft: 16,
    },
    answerInputInner: {
        width: "100%",
        borderRadius: 20,
        backgroundColor: Color.WHITE,
        fontSize: 18,
        color: Color.BLACK,
        display: "flex",
        textAlignVertical: "top",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    actionButton: {
        width: 25,
        height: 25,
    },
    addAnswerButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    saveButton: {
        marginTop: 40,
    }
});
