import React from "react";
import { Text, View } from "react-native";
import { useKeycloak } from "@react-keycloak/native";


export function HomeView() {
    const { keycloak } = useKeycloak();
    
    return (
        <View>
            <View>
                <Text style={{color: "black"}}>Home title</Text>
            </View>
            <View>
                <Text style={{color: "black"}}>{JSON.stringify(keycloak!.refreshTokenParsed)}</Text>
            </View>
        </View>
    );
}
