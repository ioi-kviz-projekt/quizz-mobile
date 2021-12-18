import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { appRoutes } from "./routes/routes";


const Tab = createBottomTabNavigator();

export function Root() {
    return (
        <NavigationContainer>
            <Tab.Navigator backBehavior="history">
                {Object.keys(appRoutes).map((key) => (
                    <Tab.Screen name={key} key={key} component={(appRoutes as any)[key].tabStack} />
                ))}
            </Tab.Navigator>
        </NavigationContainer>
    );
}
