import { useRoomContext } from "../context";

export function useLogout() {
    const { clearContext } = useRoomContext();
    /*return () => {
        AuthProvider.getInstance().clearTokens().finally(() => {
            keycloak!.logout();
        });
    };*/
    return () => {
        clearContext();
    };
}
