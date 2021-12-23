import React from "react";
import { QuizzAppRouter } from "./routes/router";
import { RoomContextProvider, StudentContextProvider } from "./context";
import { ServicesFactory, RoomService, StudentService, ThemeService } from "./services";

ServicesFactory.inject(RoomService, new RoomService());
ServicesFactory.inject(StudentService, new StudentService());
ServicesFactory.inject(ThemeService, new ThemeService());

export function Root() {
    /*return (
        <AuthContext>
            <QuizzAppRouter/>
        </AuthContext>
    );*/
    return (
        <StudentContextProvider>
            <RoomContextProvider>
                <QuizzAppRouter />
            </RoomContextProvider>
        </StudentContextProvider>
    );
}
