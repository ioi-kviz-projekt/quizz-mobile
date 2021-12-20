import React from "react";
import { Text, View } from "react-native";
import { useKeycloak } from "@react-keycloak/native";


export function HomeView() {
    const { keycloak } = useKeycloak();
    
    return (
        <View>
            <Text>Home</Text>
            <Text style={{color: "black"}}>{JSON.stringify(keycloak!.refreshTokenParsed)}</Text>
        </View>
    );
}
