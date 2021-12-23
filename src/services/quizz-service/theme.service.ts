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
    
}
