import { NavigationProp, RouteProp } from "@react-navigation/native";

export type VoidFunc = () => void;
export const NOOP: VoidFunc = () => {};

export interface ViewSharedProps {
    navigation: NavigationProp<any>;
    route: RouteProp<any, any>;
}
