import React from "react";

import { style } from "./progress-step.style";
import { StyleProp, Text, View, ViewStyle } from "react-native";

interface ProgressStepProps {
    label: string;
    shown: boolean;
}

function determineBarStyle(shown: boolean): StyleProp<ViewStyle>[] {
    if (shown) {
        return [style.bar];
    }
    return [style.bar, style.blackBar];
}

function determinePointStyle(shown: boolean): StyleProp<ViewStyle>[] {
    if (shown) {
        return [style.point];
    }
    return [style.point, style.blackPoint];
}

function getRandomWidth(): number {
    const max = 250;
    const min = 30;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function determineLabelStyle(shown: boolean): StyleProp<ViewStyle>[] {
    if (shown) {
        return [style.label];
    }
    
    const randomWidthStyle: StyleProp<ViewStyle> = {
        width: getRandomWidth(),
    };
    
    return [style.label, style.blackLabel, randomWidthStyle];
}

export function ProgressStep(props: ProgressStepProps) {
    const { shown, label } = props;
    
    return (
        <View>
            <View>
                <View style={determineBarStyle(shown)} />
            </View>
            <View>
                <View>
                    <View style={determinePointStyle(shown)}/>
                </View>
                <View>
                    <View style={determineLabelStyle(shown)}>
                        {shown && (
                            <Text style={style.labelText}>{label}</Text>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}
