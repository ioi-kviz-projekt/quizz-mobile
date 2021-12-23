import React from "react";
import { Context, createContext, Dispatch, ReactElement, SetStateAction, useContext, useState } from "react";
import { Room } from "@quizz-service/quizz-lib-v1";


interface RoomState {
    room: Room | null;
}

export type RoomContextProps = {
    state: RoomState;
    setter: Dispatch<SetStateAction<RoomState>>;
}

export const ROOM_CONTEXT: Context<RoomContextProps> = createContext({} as RoomContextProps);
export const RoomContext = ROOM_CONTEXT.Consumer;

export function useRoomContext() {
    const { state, setter } = useContext(ROOM_CONTEXT);
    return {
        context: state,
        setContext: function(room: Room) {
            setter({
                room: room,
            });
        },
        clearContext: function() {
            setter({
                room: null,
            });
        },
    };
}

interface RoomContextProviderProps {
    children: ReactElement | ReactElement[];
}

export function RoomContextProvider(props: RoomContextProviderProps) {
    const { children } = props;
    const [state, setter] = useState<RoomState>({
        room: null,
    });
    
    return (
        <ROOM_CONTEXT.Provider value={{
            state: state,
            setter: setter,
        }}>
            {children}
        </ROOM_CONTEXT.Provider>
    );
}
