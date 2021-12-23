import React from "react";
import { Button, ExpandableButton, Layout, PaddedView, TitleArea } from "../../../shared";
import { useFlag, useLogout } from "../../../../utils";
import { style } from "./home.style";
import { Popup } from "../../../shared/components/popup";
import { Text } from "react-native";
import { useCustomBackNav } from "../../../../utils/hooks";
import { useStudentContext } from "../../../../context";

export function HomeView() {
    const logout = useLogout();
    const { context } = useStudentContext();
    const [logoutPromptShown, showLogoutPrompt, hideLogoutPrompt] = useFlag(false);
    
    useCustomBackNav(() => {
        return true;
    });
    
    return (
        <Layout>
            <TitleArea title={"Pozdravljen, " + context.student?.fullName + "!"} />
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
