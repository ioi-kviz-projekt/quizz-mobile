import React, { ReactElement } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface PaddedViewProps {
    children: ReactElement | ReactElement[];
    padding: number;
    containerStyle: StyleProp<ViewStyle>;
}

export function PaddedView(props: PaddedViewProps) {
    const { children, containerStyle, padding } = props;
    
    const appliedPaddingStyle = {
        paddingHorizontal: padding,
    };
    
    return (
        <View style={[appliedPaddingStyle, containerStyle]}>
            {children}
        </View>
    );
}

PaddedView.defaultProps = {
    children: <></>,
    padding: 25,
    containerStyle: {},
};
