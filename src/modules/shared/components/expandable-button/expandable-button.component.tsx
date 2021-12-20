import React from "react";
import { Button, ButtonProps } from "../button";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { style } from "./expandable-button.style";
import { NOOP } from "../../../../types";

interface ExpandableButtonProps extends ButtonProps {
    expandedText: string;
    containerStyle: StyleProp<ViewStyle>;
}

export function ExpandableButton(props: ExpandableButtonProps) {
    const { expandedText, containerStyle } = props;
    
    return (
        <View style={[style.button, containerStyle]}>
            <Button {...props} />
            <View style={style.expandedTextContainer}>
                <Text style={style.expandedText}>{expandedText}</Text>
            </View>
        </View>
    );
}

ExpandableButton.defaultProps = {
    expandedText: "",
    label: "",
    onClick: NOOP,
    buttonStyle: {},
    type: "primary",
    containerStyle: {},
};
