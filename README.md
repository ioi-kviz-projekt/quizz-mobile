# Quizz Mobile

## Build & Deploy

1. Run `npm install`
2. Follow instructions on [React Native Documentation](https://reactnative.dev/docs/environment-setup) to setup React Native environment.
3. Run `npx react-native run-android` to run device on Android (App hasn't been tested on iOS devices)

*App assumes that it is running in emulator on same device that is running quizz service on http://localhost:8080. If this is not true, you need to edit environment files to reflect the change.*

## Environment configuration setup

If you are running application in emulator, edit `environment.dev.ts` and set values to appropriate URL.

If you are running application on physical device, either setup port forwarding (consult Android docs), or edit `environment.prod.ts` and set values to appropriate URL.
