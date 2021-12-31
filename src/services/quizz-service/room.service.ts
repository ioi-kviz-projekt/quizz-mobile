import { QuizzAbstractService } from "./quizz.abstract-service";
import { Observable } from "rxjs";
import { QuizInstance, Room, RoomRegistrationRequest } from "@quizz-service/quizz-lib-v1";
import { catchAxiosError, getBody, mapToType } from "../../utils";
import { AxiosResponse } from "axios";

export class RoomService extends QuizzAbstractService {
    
    public joinRoom(request: RoomRegistrationRequest): Observable<Room> {
        return this.http.post("/rooms/join", request).pipe(
            mapToType<AxiosResponse<Room>>(),
            getBody(),
            catchAxiosError(),
        );
    }
    
    public getActiveQuiz(roomId: string): Observable<QuizInstance> {
        return this.http.get(`/quizzes/${roomId}/active`).pipe(
            mapToType<AxiosResponse<QuizInstance>>(),
            getBody(),
            catchAxiosError(),
        );
    }
    
}
