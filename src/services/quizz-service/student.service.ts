import { QuizzAbstractService } from "./quizz.abstract-service";
import { Observable } from "rxjs";
import { CheckUserResponse, Student } from "@quizz-service/quizz-lib-v1";
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
    
    public getStudentInfo(): Observable<Student> {
        return this.http.get("/students/info").pipe(
            mapToType<AxiosResponse<Student>>(),
            getBody(),
            catchAxiosError(),
        );
    }
    
}
