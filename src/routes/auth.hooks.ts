import { appRoutes } from "./app.routes";

export function useRouteGuard(): (authenticated: boolean) => (route: string) => boolean {
    return (authenticated: boolean) => {
        return (route: string) => {
            const { requireAuth } = (appRoutes as any)[route];
            if (authenticated && requireAuth) {
                return true;
            }
            if (!authenticated && !requireAuth) {
                return true;
            }
            return false;
        };
    };
}
