import { StyleSheet } from "react-native";
import { Color } from "../../../../styles";

export const style = StyleSheet.create({
    container: {
        paddingBottom: 20,
    },
    bar: {
        width: 5,
        backgroundColor: Color.GREEN,
        height: 50,
    },
    blackBar: {
        backgroundColor: Color.BLACK,
    },
    point: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Color.GREEN,
        left: -8,
    },
    blackPoint: {
        backgroundColor: Color.BLACK,
    },
    label: {
        borderRadius: 14,
        backgroundColor: Color.GREEN,
        paddingVertical: 4,
        paddingHorizontal: 25,
        position: "absolute",
        left: 40,
        top: -28,
        height: 32,
    },
    blackLabel: {
        backgroundColor: Color.BLACK,
    },
    labelText: {
        color: Color.BLACK,
        fontSize: 18,
        fontWeight: "bold",
    },
});
