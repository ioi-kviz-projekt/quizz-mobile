import { QuizzAbstractService } from "./quizz.abstract-service";
import { Observable } from "rxjs";
import { QuestionCreateRequest } from "@quizz-service/quizz-lib-v1";
import { catchAxiosError, mapToVoid } from "../../utils";


export class QuestionService extends QuizzAbstractService {
    
    public addQuestion(request: QuestionCreateRequest): Observable<void> {
        return this.http.post("/questions", request).pipe(
            mapToVoid(),
            catchAxiosError(),
        );
    }
    
}
