import { QuizzAbstractService } from "./quizz.abstract-service";
import { Observable } from "rxjs";
import { CheckUserResponse } from "@quizz-service/quizz-lib-v1";
import { catchAxiosError, getBody, mapToType } from "../../utils";
import { AxiosResponse } from "axios";


export class StudentService extends QuizzAbstractService {
    
    public checkUserStatus(): Observable<CheckUserResponse> {
        return this.http.post("/students/status", null).pipe(
            mapToType<AxiosResponse<CheckUserResponse>>(),
            getBody(),
            catchAxiosError(),
        );
    }
    
}
