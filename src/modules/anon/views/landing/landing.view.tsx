import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { useKeycloak } from "@react-keycloak/native";
import { Button, Layout, PaddedView } from "../../../shared";
import pivkaLogo from "../../../../media/images/pivka_logo.png";
import pivkaBg from "../../../../media/images/bg-pivka.png";
import { style } from "./landing.style";

export function LandingView() {
    const { keycloak } = useKeycloak();
    
    return (
        <Layout>
            <PaddedView containerStyle={style.content}>
                <View style={style.header}>
                    <Image source={pivkaLogo} width={250} height={125} />
                </View>
                
                <Button label="Login" onClick={() => {
                    keycloak!.login().then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.error(err);
                    });
                }} type="primary" />
            </PaddedView>
        </Layout>
    );
}
