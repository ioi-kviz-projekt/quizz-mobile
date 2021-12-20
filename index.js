/**
 * @format
 */

import { AppRegistry, LogBox } from "react-native";
import { Root } from "./src/root.component";
import { name as appName } from "./app.json";

LogBox.ignoreLogs([
    "EventEmitter.removeListener('url', ...):",
    "EventEmitter.removeListener('appStateDidChange', ...):",
]);
AppRegistry.registerComponent(appName, () => Root);
