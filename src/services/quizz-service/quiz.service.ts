import { QuizzAbstractService } from "./quizz.abstract-service";
import { Observable } from "rxjs";
import { QuizSummary } from "@quizz-service/quizz-lib-v1";
import { catchAxiosError, getBody, mapToType } from "../../utils";
import { AxiosResponse } from "axios";


export class QuizService extends QuizzAbstractService {
    
    public getQuizzSummary(quizId: string): Observable<QuizSummary> {
        return this.http.get(`/quizzes/summary/${quizId}`).pipe(
            mapToType<AxiosResponse<QuizSummary>>(),
            getBody(),
            catchAxiosError(),
        );
    }
    
}
