import { AppRoutes } from "./route.types";
import { TabRoute, ViewRoute } from "./routes.definitions";
import { createStack } from "./route.utils";
import { tabs } from "./tab.definitions";

export const appRoutes: AppRoutes = {
    [TabRoute.ANONYMOUS]: {
        tabStack: createStack(tabs.anonymous, ViewRoute.LANDING),
        requireAuth: false,
    },
    [TabRoute.HOME]: {
        tabStack: createStack(tabs.home, ViewRoute.HOME),
        requireAuth: true,
    },
    [TabRoute.DISCOVERY]: {
        tabStack: createStack(tabs.discovery, ViewRoute.PROGRESS),
        requireAuth: true,
    },
    [TabRoute.QUIZ]: {
        tabStack: createStack(tabs.quiz, ViewRoute.LOBBY),
        requireAuth: true,
    },
};
