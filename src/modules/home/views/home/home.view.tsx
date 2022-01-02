import React, { useEffect } from "react";
import { ImageBackground, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button, ExpandableButton, Layout, PaddedView, TitleArea, Popup } from "../../../shared";
import { useFlag, useLogout, useDimensionalStyles, useCustomBackNav, useLocationPermissions } from "../../../../utils";
import { useStudentContext } from "../../../../context";
import { TabRoute, ViewRoute } from "../../../../routes";

import { style } from "./home.style";
import pivkaBg from "../../../../media/images/bg_pivka.png";

export function HomeView() {
    const logout = useLogout();
    const { context } = useStudentContext();
    const { navigate } = useNavigation<any>();
    const [logoutPromptShown, showLogoutPrompt, hideLogoutPrompt] = useFlag(false);
    const { heightStyle, width, height } = useDimensionalStyles();
    
    const requestLocation = useLocationPermissions();
    
    useCustomBackNav(() => {
        return true;
    });
    
    async function checkLocationPermissions() {
        const hasPermissions = await requestLocation();
        if (!hasPermissions) {
            console.error("No location permission granted!");
        }
    }
    
    useEffect(() => {
        checkLocationPermissions();
    }, []);
    
    return (
        <Layout>
            <ImageBackground source={pivkaBg} resizeMode="cover" width={width} height={height}>
                <TitleArea title={"Pozdravljen, " + context.student?.fullName + "!"} />
                <PaddedView containerStyle={[style.content, heightStyle]}>
                    
                    <ExpandableButton
                        label="Sestavi nalogo"
                        expandedText="V skupini se sprehodite po razstavi in sestavite naloge za skupinsko igro."
                        containerStyle={style.firstButton}
                        onClick={() => {
                            navigate(TabRoute.DISCOVERY, { screen: ViewRoute.PROGRESS, initial: false });
                        }} />
                    
                    <ExpandableButton
                        label="Začni igro"
                        expandedText="Skupaj v razredu rešite naloge, ki ste jih sestavili po skupinah."
                        onClick={() => {
                            navigate(TabRoute.QUIZ, { screen: ViewRoute.LOBBY, initial: false });
                        }} />
                    
                    <Button
                        label="Zapusti sobo"
                        buttonStyle={style.logoutButton}
                        onClick={() => {
                            showLogoutPrompt();
                        }} />
                
                </PaddedView>
                
                <Popup visible={logoutPromptShown} onClose={() => {
                    hideLogoutPrompt();
                }} contentStyle={style.popupContent}>
                    <Text style={style.popupText}>Ali res želite zapustiti sobo?</Text>
                    <Button label="Zapusti" onClick={() => {
                        hideLogoutPrompt();
                        logout();
                    }} />
                </Popup>
            </ImageBackground>
        </Layout>
    );
}
