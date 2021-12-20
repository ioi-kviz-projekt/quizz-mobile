import React from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import { style } from "./title-area.style";

interface TitleAreaProps {
    title: string;
    style: StyleProp<ViewStyle>;
    textStyle: StyleProp<TextStyle>;
}

export function TitleArea(props: TitleAreaProps) {
    const { style: areaStyle, textStyle, title } = props;
    
    return (
        <View style={[style.titleArea, areaStyle]}>
            <Text style={[style.titleAreaText, textStyle]}>{title}</Text>
        </View>
    );
}

TitleArea.defaultProps = {
    textStyle: {},
    style: {},
};
