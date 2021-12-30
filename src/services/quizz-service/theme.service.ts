import { QuizzAbstractService } from "./quizz.abstract-service";
import { Observable } from "rxjs";
import { DiscoverableTheme } from "@quizz-service/quizz-lib-v1";
import { catchAxiosError, getBody, mapToType } from "../../utils";
import { AxiosResponse } from "axios";

export class ThemeService extends QuizzAbstractService {
    
    public getThemes(): Observable<DiscoverableTheme[]> {
        return this.http.get("/themes").pipe(
            mapToType<AxiosResponse<DiscoverableTheme[]>>(),
            getBody(),
            catchAxiosError(),
        );
    }
    
    public checkThemeLocation(themes: DiscoverableTheme[], latitude: number, longitude: number): DiscoverableTheme | undefined {
        return themes.find(theme => {
            const distance = this.calcDistance(theme.latitude, theme.longitude, latitude, longitude);
            return distance <= theme.area;
        });
    }
    
    private calcDistance(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    
}
