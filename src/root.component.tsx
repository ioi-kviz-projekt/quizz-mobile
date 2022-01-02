import React from "react";
import { QuizzAppRouter } from "./routes/router";
import { RoomContextProvider, StudentContextProvider } from "./context";
import {
    ServicesFactory,
    RoomService,
    StudentService,
    ThemeService,
    QuizService,
    QuestionService,
} from "./services";

ServicesFactory.inject(RoomService, new RoomService());
ServicesFactory.inject(StudentService, new StudentService());
ServicesFactory.inject(ThemeService, new ThemeService());
ServicesFactory.inject(QuizService, new QuizService());
ServicesFactory.inject(QuestionService, new QuestionService());

export function Root() {
    return (
        <StudentContextProvider>
            <RoomContextProvider>
                <QuizzAppRouter />
            </RoomContextProvider>
        </StudentContextProvider>
    );
}
