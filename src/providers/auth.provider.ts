import { TokenResponse } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class AuthProvider {
    
    private static readonly TOKENS_STORAGE_KEY = "ioi.quizz.auth.tokens";
    
    private static INSTANCE: AuthProvider | null = null;
    
    public static getInstance(): AuthProvider {
        if (AuthProvider.INSTANCE === null) {
            AuthProvider.INSTANCE = new AuthProvider();
        }
        return AuthProvider.INSTANCE;
    }
    
    private constructor() {
    }
    
    public async storeTokens(tokens: TokenResponse): Promise<void> {
        const stringifiedTokens = JSON.stringify(tokens);
        await AsyncStorage.setItem(AuthProvider.TOKENS_STORAGE_KEY, stringifiedTokens);
        console.debug("Persisted tokens!");
    }
    
    public async clearTokens(): Promise<void> {
        await AsyncStorage.removeItem(AuthProvider.TOKENS_STORAGE_KEY);
        console.debug("Cleared persisted tokens!");
    }
    
    public async retrieveTokens(): Promise<TokenResponse | null> {
        const stringifiedTokens = await AsyncStorage.getItem(AuthProvider.TOKENS_STORAGE_KEY);
        if (!stringifiedTokens) {
            return null;
        }
        return JSON.parse(stringifiedTokens) as TokenResponse;
    }
}
