import { useKeycloak } from "@react-keycloak/native";
import { User, VoidFunc } from "../types";
import { useState } from "react";

export function useUserInfo(): User {
    const { keycloak } = useKeycloak();
    
    const userInfo = keycloak!.idTokenParsed as any;
    
    return {
        userId: userInfo.sub,
        username: userInfo.preferred_username,
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
