import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { appRoutes } from "./app.routes";
import { useRouteGuard } from "./route.hooks";
import { useRoomContext } from "../context";

const Tab = createBottomTabNavigator();

function contextFilter(route: string, authenticated: boolean): boolean {
    const { requireAuth } = (appRoutes as any)[route];
    if (authenticated && requireAuth) {
        return true;
    }
    if (!authenticated && !requireAuth) {
        return true;
    }
    return false;
}

export function QuizzAppRouter() {
    const { context } = useRoomContext();
    
    return (
        <NavigationContainer>
            <Tab.Navigator backBehavior="history" screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    display: "none",
                },
                unmountOnBlur: true,
            }}>
                {Object.keys(appRoutes)
                    .filter(route => contextFilter(route, context.room !== null))
                    .map((key) => (
                        <Tab.Screen name={key} key={key} component={(appRoutes as any)[key].tabStack} />
                    ))}
            </Tab.Navigator>
        </NavigationContainer>
    );
}
