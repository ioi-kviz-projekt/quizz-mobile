import { interval, Observable, Subject } from "rxjs";
import { SocketMessage } from "@quizz-service/quizz-lib-v1";
import { webSocket } from "rxjs/webSocket";
import { environment } from "../environment";


export class DiscoveryService {
    
    private static INSTANCE: DiscoveryService | null = null;
    
    public static getInstance(): DiscoveryService {
        if (DiscoveryService.INSTANCE === null) {
            DiscoveryService.INSTANCE = new DiscoveryService();
        }
        return DiscoveryService.INSTANCE;
    }
    
    private ws$: Subject<SocketMessage>;
    private open$: Subject<Event> = new Subject<Event>();
    
    private constructor() {
    
    }
    
    public connect(): Observable<Event> {
        this.ws$ = webSocket({
            url: environment.discoveryWSUrl,
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
    
}
