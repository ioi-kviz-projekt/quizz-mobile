import React, { ReactElement } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ViewRoute } from "./routes.definitions";
import { TabRoutes } from "./route.types";
import { ViewSharedProps } from "../types";

export function createStack(routes: TabRoutes, initialRoute: ViewRoute): () => ReactElement<ViewSharedProps> {
    const Stack = createStackNavigator();
    return () => (
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{
            headerShown: false,
        }}>
            {Object.keys(routes).map((key) => (
                <Stack.Screen name={key} key={key} component={(routes as any)[key].component} />
            ))}
        </Stack.Navigator>
    );
}
