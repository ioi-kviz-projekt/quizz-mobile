import React from "react";
import { Text, View } from "react-native";
import { useKeycloak } from "@react-keycloak/native";
import { Button } from "../../../shared";

export function LandingView() {
    const { keycloak } = useKeycloak();
    
    return (
        <View>
            <Text>Landing</Text>
            
            <Button label="Login" onClick={() => {
                keycloak!.login().then(res =>  {
                    console.log(res);
                }).catch(err => {
                    console.error(err);
                });
            }} type="primary"/>
        </View>
    );
}
