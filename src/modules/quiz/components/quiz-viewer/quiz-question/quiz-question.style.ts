import { StyleSheet } from "react-native";
import { Color } from "../../../../../styles";

export const style = StyleSheet.create({
    container: {
        marginTop: 40,
    },
    answerContainer: {
        marginBottom: 20,
    },
    shadowContainer: {
        width: "100%",
    },
    answer: {
        borderRadius: 15,
        backgroundColor: Color.WHITE,
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    answerText: {
        color: Color.BLACK,
        fontSize: 18,
        fontWeight: "600",
    },
    selectedAnswer: {
        backgroundColor: Color.GREEN,
    },
    selectedAnswerText: {
        color: Color.WHITE,
    },
});
