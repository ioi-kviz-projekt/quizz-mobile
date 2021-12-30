import React from "react";
import { Context, createContext, Dispatch, ReactElement, SetStateAction, useContext, useState } from "react";
import { Theme } from "@quizz-service/quizz-lib-v1";


interface DiscoveryState {
    theme: Theme | null;
}

export type DiscoveryContextProps = {
    state: DiscoveryState;
    setter: Dispatch<SetStateAction<DiscoveryState>>;
}

export const DISCOVERY_CONTEXT: Context<DiscoveryContextProps> = createContext({} as DiscoveryContextProps);
export const DiscoveryContext = DISCOVERY_CONTEXT.Consumer;

export function useDiscoveryContext() {
    const { state, setter } = useContext(DISCOVERY_CONTEXT);
    return {
        context: state,
        setContext: function(theme: Theme) {
            setter({
                theme: theme,
            });
        },
        clearContext: function() {
            setter({
                theme: null,
            });
        },
    };
}

interface DiscoveryContextProviderProps {
    children: ReactElement | ReactElement[];
}

export function DiscoveryContextProvider(props: DiscoveryContextProviderProps) {
    const { children } = props;
    const [state, setter] = useState<DiscoveryState>({
        theme: null,
    });
    
    return (
        <DISCOVERY_CONTEXT.Provider value={{
            state: state,
            setter: setter,
        }}>
            {children}
        </DISCOVERY_CONTEXT.Provider>
    );
}
