import { ViewSharedProps } from "../types";
import { ReactElement } from "react";
import { TabRoute, ViewRoute } from "./routes.definitions";

interface RouteItem {
    component: (props: ViewSharedProps) => ReactElement<ViewSharedProps>;
}

interface TabItem {
    tabStack: any;
    requireAuth: boolean;
}

export type TabRoutes = Partial<Record<ViewRoute, RouteItem>>;

export type TabStackRoutes = {
    [tabName in TabRoute]: TabRoutes;
};

export type AppRoutes = {
    [tabName in TabRoute]: TabItem;
};
