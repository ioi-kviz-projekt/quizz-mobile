import React from "react";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { style } from "./timer.style";

interface TimerProps {
    until: Date;
    updateInterval: number;
}

function calculateDiff(date1: Date, date2: Date): number {
    const diff = date2.getTime() - date1.getTime();
    const diffInSeconds = Math.floor(diff / 1000);
    if (diffInSeconds < 0) {
        return 0;
    }
    return diffInSeconds;
}

function getInitialValue(until: Date): number {
    return calculateDiff(new Date(), until);
}

export function Timer(props: TimerProps) {
    const { until, updateInterval } = props;
    const [seconds, setSeconds] = useState<number>(getInitialValue(until));
    
    useEffect(() => {
        const handler = setInterval(() => {
            setSeconds(() => {
                return calculateDiff(new Date(), until);
            });
        }, updateInterval);
        return () => {
            clearInterval(handler);
        };
    }, []);
    
    return (
        <View style={style.container}>
            <Text style={style.text}>{seconds}s</Text>
        </View>
    );
}

Timer.defaultProps = {
    updateInterval: 250,
};
