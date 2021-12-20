import { useKeycloak } from "@react-keycloak/native";
import { AuthProvider } from "../providers";

export function useLogout() {
    const { keycloak } = useKeycloak();
    return () => {
        AuthProvider.getInstance().clearTokens().finally(() => {
            keycloak!.logout();
        });
    };
}
