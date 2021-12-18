import { TabRoutes, TabStackRoutes } from "./route.types";
import { TabRoute, ViewRoute } from "./routes.definitions";
import { LandingView } from "../modules/anon/views/landing/landing.view";
import { HomeView } from "../modules/home";
import { LobbyView } from "../modules/quiz/views/lobby/lobby.view";
import { ProgressView } from "../modules/discovery/views/progress/progress.view";

export const commonViews: TabRoutes = {};

export const tabs: TabStackRoutes = {
    [TabRoute.ANONYMOUS]: {
        [ViewRoute.LANDING]: {
            component: LandingView,
        },
    },
    [TabRoute.HOME]: {
        [ViewRoute.HOME]: {
            component: HomeView,
        },
        ...commonViews,
    },
    [TabRoute.QUIZ]: {
        [ViewRoute.LOBBY]: {
            component: LobbyView,
        },
        ...commonViews,
    },
    [TabRoute.DISCOVERY]: {
        [ViewRoute.PROGRESS]: {
            component: ProgressView,
        },
        ...commonViews,
    },
};
