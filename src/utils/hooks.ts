import { useKeycloak } from "@react-keycloak/native";
import { User } from "../types";

export function useUserInfo(): User {
    const { keycloak } = useKeycloak();
    
    const userInfo = keycloak!.idTokenParsed as any;
    
    return {
        userId: userInfo.sub,
        username: userInfo.preferred_username,
    };
}
