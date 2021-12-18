import React from "react";
import { Button, ButtonProps } from "../button";
import { Text, View } from "react-native";
import { style } from "./expandable-button.style";

interface ExpandableButtonProps extends ButtonProps {
    expandedText: string;
}

export function ExpandableButton(props: ExpandableButtonProps) {
    const { expandedText } = props;
    
    return (
        <>
            <View style={style.button}>
                <Button {...props} />
                <View style={style.expandedTextContainer}>
                    <Text style={style.expandedText}>{expandedText}</Text>
                </View>
            </View>
        </>
    );
}
