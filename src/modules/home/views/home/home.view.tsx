import React from "react";
import { Button, ExpandableButton, Layout, PaddedView, TitleArea } from "../../../shared";
import { useFlag, useLogout, useUserInfo } from "../../../../utils";
import { style } from "./home.style";
import { Popup } from "../../../shared/components/popup";
import { Text, View } from "react-native";
import { useCustomBackNav } from "../../../../utils/hooks";

export function HomeView() {
    const user = useUserInfo();
    const logout = useLogout();
    const [logoutPromptShown, showLogoutPrompt, hideLogoutPrompt] = useFlag(false);
    
    useCustomBackNav(() => {
        return true;
    });
    
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
        </Layout>
    );
}
