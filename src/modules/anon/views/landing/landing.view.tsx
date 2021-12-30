import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

import { Button, Layout, PaddedView, Input } from "../../../shared";
import { useDimensionalStyles } from "../../../../utils";

import { useLandingViewController } from "./landing.view.controller";
import { LandingStatus } from "./landing.view.state";
import pivkaLogo from "../../../../media/images/pivka_logo.png";
import pivkaBg from "../../../../media/images/bg_pivka.png";
import { style } from "./landing.style";

export function LandingView() {
    const { state, formState, onRoomNumberInput, onNameInput, joinRoom } = useLandingViewController();
    const { heightStyle, width, height } = useDimensionalStyles();
    
    return (
        <Layout>
            <ImageBackground source={pivkaBg} resizeMode="cover" width={width} height={height}>
                <PaddedView containerStyle={[style.content, heightStyle]}>
                    <View style={style.header}>
                        <Image source={pivkaLogo} width={250} height={125} />
                    </View>
                    
                    {state.status === LandingStatus.LOADING ? (
                        <View>
                            <Text>Loading ...</Text>
                        </View>
                    ) : (
                        <>
                            <Input initialValue={formState.fields.roomNumber}
                                label="Številka sobe:"
                                containerStyle={style.firstInput}
                                invalid={!!formState.errors?.roomNumber}
                                onInput={newNumber => onRoomNumberInput(newNumber)} />
                            
                            {state.status === LandingStatus.NO_USER && (
                                <Input initialValue={formState.fields.fullName}
                                    label="Ime in priimek:"
                                    containerStyle={style.secondInput}
                                    invalid={!!formState.errors?.fullName}
                                    onInput={name => onNameInput(name)} />
                            )}
                            
                            <Button label="Vstopi" onClick={() => {
                                joinRoom();
                            }} type="primary" buttonStyle={style.button} />
                        </>
                    )}
                </PaddedView>
            </ImageBackground>
        </Layout>
    );
}
