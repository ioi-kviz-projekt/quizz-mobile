import React from "react";
import { SafeAreaView, View } from "react-native";
import { ReactElement } from "react";
import { style } from "./layout.style";

interface LayoutProps {
    children: ReactElement | ReactElement[];
}

export function Layout(props: LayoutProps) {
    const { children } = props;
    return (
        <SafeAreaView>
            <View style={style.background}>
                {children}
            </View>
        </SafeAreaView>
    );
}
