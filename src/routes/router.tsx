import { useKeycloak } from "@react-keycloak/native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { appRoutes } from "./app.routes";
import { useRouteGuard } from "./auth.hooks";

const Tab = createBottomTabNavigator();

export function QuizzAppRouter() {
    const { keycloak, initialized } = useKeycloak();
    const routeGuard = useRouteGuard();
    
    if (!initialized) {
        return (<></>);
    }
    
    return (
        <NavigationContainer>
            <Tab.Navigator backBehavior="history">
                {Object.keys(appRoutes)
                    .filter(routeGuard(keycloak?.authenticated ?? false))
                    .map((key) => (
                        <Tab.Screen name={key} key={key} component={(appRoutes as any)[key].tabStack} />
                    ))}
            </Tab.Navigator>
        </NavigationContainer>
    );
}
