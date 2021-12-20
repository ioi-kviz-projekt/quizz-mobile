import React from "react";
import { QuizzAppRouter } from "./routes/router";
import { AuthContext } from "./context";

export function Root() {
    return (
        <AuthContext>
            <QuizzAppRouter/>
        </AuthContext>
    );
}
