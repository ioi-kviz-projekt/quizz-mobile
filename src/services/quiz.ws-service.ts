import { take } from "rxjs";
import { SocketMessage } from "@quizz-service/quizz-lib-v1";
import { getUniqueId } from "react-native-device-info";

import { WebsocketService } from "./ws/ws.service";

export class QuizWsService extends WebsocketService {
    
    private static INSTANCE: QuizWsService | null = null;
    
    public static getInstance(): QuizWsService {
        if (QuizWsService.INSTANCE === null) {
            QuizWsService.INSTANCE = new QuizWsService();
        }
        return QuizWsService.INSTANCE;
    }
    
    private constructor() {
        super("/ws/quiz");
    }
    
    public connectAndRegister() {
        console.log(this.connect);
        this.connect().pipe(
            take(1)
        ).subscribe({
            next: () => {
                const message: SocketMessage = {
                    type: SocketMessage.Type.REGISTRATION,
                    accessToken: getUniqueId(),
                };
                this.sendMessage(message);
            },
            error: err => {
                console.error(err);
            },
        });
    }
    
}
