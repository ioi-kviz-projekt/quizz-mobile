import { RNKeycloak } from "@react-keycloak/native";

export const keycloakConfig = new RNKeycloak({
    url: "https://keycloak.mjamsek.com/auth",
    realm: "ioi-projekt",
    clientId: "quizz-mobile",
});
