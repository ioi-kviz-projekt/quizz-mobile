import { useEffect, useState } from "react";
import { ServicesFactory, ThemeService } from "../../../../services";
import { take } from "rxjs";
import { DiscoverableTheme } from "@quizz-service/quizz-lib-v1";


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
    
    return themes;
}
