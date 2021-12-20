import React, { ReactElement, useCallback, useLayoutEffect, useState } from "react";
import { ReactNativeKeycloakProvider } from "@react-keycloak/native";
import { keycloakConfig } from "../../config/auth.config";
import { NOOP, TokenResponse } from "../../types";
import { AuthProvider } from "../../providers";

interface AuthContextProps {
    children: ReactElement | ReactElement[];
}

interface AuthContextState {
    loaded: boolean;
    tokens: TokenResponse | null;
}

export function AuthContext(props: AuthContextProps) {
    const { children } = props;
    
    const [tokenState, setTokenState] = useState<AuthContextState>({
        loaded: false,
        tokens: null,
    });
    
    useLayoutEffect(() => {
        AuthProvider.getInstance().retrieveTokens().then(tokens => {
            if (tokens !== null) {
                setTokenState({
                    loaded: true,
                    tokens: tokens,
                });
            } else {
                setTokenState({
                    loaded: true,
                    tokens: null,
                });
            }
        });
    }, []);
    
    const onKeycloakTokens = useCallback((tokens: any) => {
        if (tokens.token) {
            AuthProvider.getInstance().storeTokens(tokens).then(NOOP);
        }
    }, []);
    
    return (
        <ReactNativeKeycloakProvider
            authClient={keycloakConfig}
            initOptions={{
                redirectUri: "ioi.quizz://auth-callback",
                inAppBrowserOptions: {
                    forceCloseOnRedirection: true,
                },
                ...tokenState.tokens,
            }}
            autoRefreshToken={true}
            onTokens={onKeycloakTokens}
        >
            {tokenState.loaded && (
                <>{children}</>
            )}
        </ReactNativeKeycloakProvider>
    );
}
