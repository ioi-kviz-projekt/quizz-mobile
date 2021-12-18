import React from "react";
import { VoidFunc } from "../../../../types";
import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { style } from "./button.style";

export interface ButtonProps {
    label: string;
    onClick: VoidFunc;
    buttonStyle?: StyleProp<ViewStyle>;
    type: "primary" | "secondary" | "danger";
}

interface ButtonTypeStyle {
    button: StyleProp<ViewStyle>[];
    label: StyleProp<TextStyle>[];
}

function getButtonStyle(props: ButtonProps): ButtonTypeStyle {
    const buttonStyle: StyleProp<ViewStyle>[] = [style.button];
    const textStyle: StyleProp<TextStyle>[] = [style.buttonText];
    if (props.type === "primary") {
        buttonStyle.push(style.buttonTypePrimary);
        textStyle.push(style.buttonTypePrimaryText);
    } else if (props.type === "secondary") {
        buttonStyle.push(style.buttonTypeSecondary);
        textStyle.push(style.buttonTypeSecondaryText);
    } else if (props.type === "danger") {
        buttonStyle.push(style.buttonTypeDanger);
        textStyle.push(style.buttonTypeDangerText);
    }
    
    buttonStyle.push(props.buttonStyle);
    return {
        button: buttonStyle,
        label: textStyle,
    };
}

export function Button(props: ButtonProps) {
    const { onClick, label } = props;
    const { button: buttonStyle, label: labelStyle } = getButtonStyle(props);
    return (
        <TouchableOpacity onPress={onClick} style={buttonStyle}>
            <Text style={labelStyle}>{label}</Text>
        </TouchableOpacity>
    );
}
