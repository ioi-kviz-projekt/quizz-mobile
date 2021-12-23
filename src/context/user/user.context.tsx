import React from "react";
import { Context, createContext, Dispatch, ReactElement, SetStateAction, useContext, useState } from "react";
import { Student } from "@quizz-service/quizz-lib-v1";


interface StudentState {
    student: Student | null;
}

export type StudentContextProps = {
    state: StudentState;
    setter: Dispatch<SetStateAction<StudentState>>;
}

export const STUDENT_CONTEXT: Context<StudentContextProps> = createContext({} as StudentContextProps);
export const StudentContext = STUDENT_CONTEXT.Consumer;

export function useStudentContext() {
    const { state, setter } = useContext(STUDENT_CONTEXT);
    return {
        context: state,
        setContext: function(student: Student) {
            setter({
                student: student,
            });
        },
        clearContext: function() {
            setter({
                student: null,
            });
        },
    };
}

interface StudentContextProviderProps {
    children: ReactElement | ReactElement[];
}

export function StudentContextProvider(props: StudentContextProviderProps) {
    const { children } = props;
    const [state, setter] = useState<StudentState>({
        student: null,
    });
    
    return (
        <STUDENT_CONTEXT.Provider value={{
            state: state,
            setter: setter,
        }}>
            {children}
        </STUDENT_CONTEXT.Provider>
    );
}
