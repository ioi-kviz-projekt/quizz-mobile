import { User, VoidFunc } from "../types";
import { useEffect, useState } from "react";
import { TabRoute, ViewRoute } from "../routes";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { BackHandler, StyleProp, useWindowDimensions, ViewStyle } from "react-native";

export function useUserInfo(): User {
    /*const { keycloak } = useKeycloak();
    
    const userInfo = keycloak!.idTokenParsed as any;*/
    
    return {
        userId: "userId",
        username: "username",
    };
}

export function useFlag(initialValue: boolean = false): [boolean, VoidFunc, VoidFunc] {
    const [flag, flagSetter] = useState<boolean>(initialValue);
    
    return [
        flag,
        function() {
            flagSetter(true);
        },
        function() {
            flagSetter(false);
        },
    ];
}

export function useBackHandler(): (tabName?: TabRoute, screen?: ViewRoute) => void {
    const navigation = useNavigation();
    return (tabName?: TabRoute, screen?: ViewRoute) => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            if (!tabName) {
                tabName = TabRoute.HOME;
            }
            let initialRoute = {
                name: tabName,
            };
            if (!screen) {
                (initialRoute as any).screen = screen;
            }
            navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [initialRoute],
            }));
        }
    };
}

export function useCustomBackNav(newFunc?: () => boolean) {
    const defaultBackHandler = useBackHandler();
    
    const defaultFunc = () => {
        defaultBackHandler();
        return true;
    };
    
    const handlerFunc: () => boolean = newFunc || defaultFunc;
    
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handlerFunc);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handlerFunc);
        };
    }, []);
}

export function useDimensionalStyles() {
    const { height, width } = useWindowDimensions();
    
    const heightStyle: StyleProp<ViewStyle> = {
        height: height,
    };
    
    const widthStyle: StyleProp<ViewStyle> = {
        width: width,
    };
    
    const dimensionalStyle: StyleProp<ViewStyle> = {
        width: width,
        height: height,
    };
    
    return {
        width,
        height,
        widthStyle,
        heightStyle,
        dimensionalStyle,
    };
}
