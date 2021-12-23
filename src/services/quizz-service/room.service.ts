import { QuizzAbstractService } from "./quizz.abstract-service";
import { Observable } from "rxjs";
import { Room, RoomRegistrationRequest } from "@quizz-service/quizz-lib-v1";
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
    
}
