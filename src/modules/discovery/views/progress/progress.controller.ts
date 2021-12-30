import { useEffect, useState } from "react";
import { DiscoveryService, ServicesFactory, ThemeService } from "../../../../services";
import { Subject, take, takeUntil } from "rxjs";
import { DiscoverableTheme, SocketMessage } from "@quizz-service/quizz-lib-v1";
import Geolocation from "react-native-geolocation-service";
import { getUniqueId } from "react-native-device-info";


export function useProgressViewController() {
    const [themes, setThemes] = useState<DiscoverableTheme[]>([]);
    
    useEffect(() => {
        ServicesFactory.get(ThemeService).getThemes().pipe(take(1)).subscribe({
            next: (retrievedThemes: DiscoverableTheme[]) => {
                setThemes(retrievedThemes);
            },
            error: (err) => {
                console.error(err);
            },
        });
    }, []);
    
    /*useEffect(() => {
        const watchId = Geolocation.watchPosition(location => {
            console.log("LOCATION CHANGED: ", location);
        }, err => {
            console.error(err);
        }, {
            distanceFilter: 2,
            enableHighAccuracy: true,
            accuracy: {
                android: "high",
                ios: "best",
            },
        });
        return () => {
            Geolocation.clearWatch(watchId);
        };
    }, []);*/
    
    useEffect(() => {
        const destroy$ = new Subject<boolean>();
        
        DiscoveryService.getInstance().connect().pipe(
            take(1),
        ).subscribe(() => {
            const message: SocketMessage = {
                type: "REGISTRATION",
                accessToken: getUniqueId(),
            };
            DiscoveryService.getInstance().sendMessage(message);
        });
        
        DiscoveryService.getInstance().listen()
            .pipe(takeUntil(destroy$))
            .subscribe({
                next: msg => {
                    if (msg.type === "DISCOVERY") {
                        const themeId = msg.payload!;
                        setThemes(prevState => {
                            return prevState.map(theme => {
                                if (theme.id === themeId) {
                                    return {
                                        ...theme,
                                        discovered: true,
                                    };
                                }
                                return theme;
                            });
                        });
                    }
                },
                error: err => {
                    console.error(err);
                },
            });
        
        return () => {
            destroy$.next(true);
        };
    }, []);
    
    
    return themes;
}
