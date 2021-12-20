import { AppRoutes } from "./route.types";
import { TabRoute, ViewRoute } from "./routes.definitions";
import { createStack } from "./route.utils";
import { tabs } from "./tab.definitions";

export const appRoutes: AppRoutes = {
    [TabRoute.ANONYMOUS]: {
        tabStack: createStack(tabs.anonymousTab, ViewRoute.LANDING),
        requireAuth: false,
    },
    [TabRoute.HOME]: {
        tabStack: createStack(tabs.homeTab, ViewRoute.HOME),
        requireAuth: true,
    },
    [TabRoute.DISCOVERY]: {
        tabStack: createStack(tabs.discoveryTab, ViewRoute.PROGRESS),
        requireAuth: true,
    },
    [TabRoute.QUIZ]: {
        tabStack: createStack(tabs.quizTab, ViewRoute.LOBBY),
        requireAuth: true,
    },
};
