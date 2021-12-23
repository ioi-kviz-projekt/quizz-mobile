import { EMPTY_STYLE, NOOP, VoidFunc } from "../../../../types";
import React, { ReactElement } from "react";
import { Overlay } from "react-native-elements";
import { Image, StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { style } from "./popup.style";
import timesIcon from "../../../../media/images/icons/times_icon.png";

interface PopupProps {
    visible: boolean;
    onClose: VoidFunc;
    children: ReactElement | ReactElement[];
    containerStyle: StyleProp<ViewStyle>;
    contentStyle: StyleProp<ViewStyle>;
}

export function Popup(props: PopupProps) {
    const { visible, onClose, children, contentStyle } = props;
    
    return (
        <Overlay isVisible={visible} onBackdropPress={onClose} overlayStyle={style.overlay}>
            <View style={style.container}>
                <View style={style.actionsContainer}>
                    <TouchableOpacity onPress={onClose} style={style.cancelActionContainer}>
                        <Image source={timesIcon} width={15} height={15} />
                    </TouchableOpacity>
                </View>
                <View style={[style.contentContainer, contentStyle]}>
                    {children}
                </View>
            </View>
        </Overlay>
    );
}

Popup.defaultProps = {
    visible: false,
    onClose: NOOP,
    children: <></>,
    containerStyle: EMPTY_STYLE,
    contentStyle: EMPTY_STYLE,
};
