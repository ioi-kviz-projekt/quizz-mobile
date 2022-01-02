import { QuizzAbstractService } from "./quizz.abstract-service";
import { Observable } from "rxjs";
import { ActiveQuizState, QuizInstance, Room, RoomRegistrationRequest } from "@quizz-service/quizz-lib-v1";
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
    
    public getActiveQuizState(roomId: string): Observable<ActiveQuizState> {
        return this.http.get(`/quizzes/${roomId}/active`).pipe(
            mapToType<AxiosResponse<ActiveQuizState>>(),
            getBody(),
            catchAxiosError(),
        );
    }
    
}
