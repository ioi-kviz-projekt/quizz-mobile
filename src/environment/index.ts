import { QuizzAppEnvironment } from "./environment.type";
import { env as devEnv } from "./environment.dev";
import { env as prodEnv } from "./environment.prod";

function EnvironmentFactory(): QuizzAppEnvironment {
    if (__DEV__) {
        return devEnv;
    }
    return prodEnv;
}

export const environment: QuizzAppEnvironment = EnvironmentFactory();
