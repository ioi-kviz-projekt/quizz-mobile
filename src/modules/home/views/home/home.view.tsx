import React from "react";
import { Button, ExpandableButton, Layout, PaddedView, TitleArea } from "../../../shared";
import { useFlag, useLogout, useUserInfo } from "../../../../utils";
import { style } from "./home.style";
import { Popup } from "../../../shared/components/popup";
import { Text, View } from "react-native";

export function HomeView() {
    const user = useUserInfo();
    const logout = useLogout();
    const [logoutPromptShown, showLogoutPrompt, hideLogoutPrompt] = useFlag(false);
    
    return (
        <Layout>
            <TitleArea title={"Pozdravljen, " + user.username + "!"} />
            <PaddedView containerStyle={style.content}>
                
                <ExpandableButton
                    label="Sestavi nalogo"
                    expandedText="V skupini se sprehodite po razstavi in sestavite naloge za skupinsko igro."
                    containerStyle={style.firstButton}
                    onClick={() => {
                    
                    }} />
                
                <ExpandableButton
                    label="Začni igro"
                    expandedText="Skupaj v razredu rešite naloge, ki ste jih sestavili po skupinah."
                    onClick={() => {
                    
                    }} />
                
                <Button
                    label="Odjava"
                    buttonStyle={style.logoutButton}
                    onClick={() => {
                        showLogoutPrompt();
                    }} />
            
            </PaddedView>
            
            
            <Popup visible={logoutPromptShown} onClose={() => {
                hideLogoutPrompt();
            }}>
                <View>
                    <Text>Are you sure you want to log out?</Text>
                    <Button label="Logout" onClick={() => {
                        hideLogoutPrompt();
                        logout();
                    }}/>
                </View>
            </Popup>
        </Layout>
    );
}
