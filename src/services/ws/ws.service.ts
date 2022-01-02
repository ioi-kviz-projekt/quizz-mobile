import { interval, Observable, Subject } from "rxjs";
import { SocketMessage } from "@quizz-service/quizz-lib-v1";
import { webSocket } from "rxjs/webSocket";
import { environment } from "../../environment";

export abstract class WebsocketService {
    
    private ws$: Subject<SocketMessage>;
    private readonly open$: Subject<Event>;
    private readonly socketPath: string;
    
    protected constructor(socketPath: string) {
        this.open$ = new Subject<Event>();
        this.socketPath = socketPath;
    }
    
    public connect(): Observable<Event> {
        this.ws$ = webSocket<SocketMessage>({
            url: "ws://" + environment.baseUrl + this.socketPath,
            openObserver: this.open$,
        });
        
        interval(60000).subscribe(() => {
            const message: SocketMessage = {
                type: "PING",
            };
            this.sendMessage(message);
        });
        
        return this.open$;
    }
    
    public sendMessage(message: SocketMessage) {
        this.ws$.next(message);
    }
    
    public listen(): Observable<SocketMessage> {
        return this.ws$.asObservable();
    }
    
    public close(): void {
        if (!this.ws$.closed) {
            this.ws$.unsubscribe();
        }
    }
    
}
