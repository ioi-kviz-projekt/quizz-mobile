import { useLayoutEffect, useReducer, useState } from "react";
import { take } from "rxjs";
import { useNavigation } from "@react-navigation/native";
import { CheckUserResponse, Room, RoomRegistrationRequest } from "@quizz-service/quizz-lib-v1";
import {
    LandingViewFormState,
    LandingViewStateActionType,
    LandingViewStateReducer,
    LandingViewStateStatus,
} from "./landing.view.state";
import { BaseError } from "../../../../types";
import { TabRoute, ViewRoute } from "../../../../routes";
import { useRoomContext, useStudentContext } from "../../../../context";
import { ServicesFactory, StudentService, RoomService } from "../../../../services";

// TODO: add user context when user if first registered

export function useLandingViewController() {
    const { navigate } = useNavigation();
    const { setContext } = useRoomContext();
    const { setContext: setUserContext } = useStudentContext();
    const [state, dispatcher] = useReducer(LandingViewStateReducer, {
        status: LandingViewStateStatus.EMPTY,
    });
    
    const [formState, setFormState] = useState<LandingViewFormState>({
        fields: {
            roomNumber: "",
            fullName: "",
        },
    });
    
    useLayoutEffect(() => {
        dispatcher({
            type: LandingViewStateActionType.START_LOADING,
        });
        
        ServicesFactory.get(StudentService).checkUserStatus()
            .pipe(take(1))
            .subscribe({
                next: (userStatus: CheckUserResponse) => {
                    if (userStatus.status === "EXISTS") {
                        setUserContext(userStatus.user);
                        dispatcher({
                            type: LandingViewStateActionType.FOUND_USER,
                            student: userStatus.user,
                        });
                    } else {
                        dispatcher({
                            type: LandingViewStateActionType.NOT_FOUND_USER,
                        });
                    }
                },
                error: (err: BaseError) => {
                    console.error(err.message);
                    dispatcher({
                        type: LandingViewStateActionType.ERRORED,
                        error: err,
                    });
                },
            });
    }, []);
    
    return {
        state,
        formState,
        startLoading: function() {
            dispatcher({
                type: LandingViewStateActionType.START_LOADING,
            });
        },
        onRoomNumberInput: function(roomNumber: string) {
            setFormState(prevState => {
                return {
                    ...prevState,
                    fields: {
                        ...prevState.fields,
                        roomNumber: roomNumber,
                    },
                };
            });
        },
        onNameInput: function(fullName: string) {
            setFormState(prevState => {
                return {
                    ...prevState,
                    fields: {
                        ...prevState.fields,
                        fullName: fullName,
                    },
                };
            });
        },
        joinRoom: function() {
            const request: RoomRegistrationRequest = {
                roomNumber: formState.fields.roomNumber,
                fullName: formState.fields.fullName,
            };
            
            ServicesFactory.get(RoomService).joinRoom(request)
                .pipe(take(1))
                .subscribe({
                    next: (room: Room) => {
                        console.log("Joined room with id ", room.roomNumber);
                        setContext(room);
                        // @ts-ignore
                        navigate(TabRoute.HOME, { screen: ViewRoute.HOME });
                    },
                    error: (err: BaseError) => {
                        dispatcher({
                            type: LandingViewStateActionType.ERRORED,
                            error: err,
                        });
                    },
                });
        },
    };
}
