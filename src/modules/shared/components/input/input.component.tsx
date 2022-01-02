import React from "react";
import { StyleProp, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";
import { EMPTY_STYLE, NOOP } from "../../../../types";
import { style } from "./input.style";

interface InputProps extends TextInputProps {
    initialValue: string,
    onInput: (change: string) => void;
    size: number;
    containerStyle: StyleProp<ViewStyle>;
    inputStyle: StyleProp<TextStyle>;
    invalid: boolean;
    label?: string;
    error?: string;
}

function evalStyle(props: InputProps): StyleProp<TextStyle>[] {
    if (props.invalid) {
        return [style.input, props.inputStyle, style.invalidInput];
    }
    return [style.input, props.inputStyle];
}

export function Input(props: InputProps) {
    const { initialValue, onInput, containerStyle, label, error, invalid } = props;
    
    return (
        <View style={[style.container, containerStyle]}>
            {label && (
                <View style={style.itemContainer}>
                    <Text style={style.label}>{label}</Text>
                </View>
            )}
            <View style={style.itemContainer}>
                <TextInput
                    style={evalStyle(props)}
                    value={initialValue}
                    onChangeText={text => {
                        onInput(text);
                    }}
                    {...props}
                />
            </View>
            {(error && invalid) && (
                <View style={style.itemContainer}>
                    <Text style={style.errorLabel}>{error}</Text>
                </View>
            )}
        </View>
    );
}

Input.defaultProps = {
    size: 5,
    containerStyle: EMPTY_STYLE,
    inputStyle: EMPTY_STYLE,
    onInput: NOOP,
    initialValue: "",
    invalid: false,
};
