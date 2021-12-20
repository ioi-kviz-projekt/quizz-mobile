import React from "react";
import { SafeAreaView, View } from "react-native";
import { ReactElement } from "react";
import { style } from "./layout.style";
import { ScrollView } from "react-native-gesture-handler";

interface LayoutProps {
    children: ReactElement | ReactElement[];
}

export function Layout(props: LayoutProps) {
    const { children } = props;
    return (
        <SafeAreaView>
            <ScrollView style={style.background}>
                {children}
            </ScrollView>
        </SafeAreaView>
    );
}
