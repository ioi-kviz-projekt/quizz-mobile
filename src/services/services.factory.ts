import { HttpService } from "./http";

interface InjectableType<T> {
    prototype: T;
    name: string;
}

export class ServicesFactory {
    
    private static cache: Map<string, HttpService> = new Map<string, HttpService>();
    
    /**
     * Returns instance of service
     * @param type type of returned service
     * @throws {ReferenceError} if service is not injected
     */
    public static get<T extends HttpService>(type: InjectableType<T>): T {
        const instance = ServicesFactory.cache.get(type.name) as T;
        if (instance) {
            return instance;
        }
        throw new ReferenceError("Cannot inject service! Service definition not provided!");
    }
    
    public static inject<T extends HttpService>(type: InjectableType<T>, instance: T): void  {
        ServicesFactory.cache.set(type.name, instance);
    }
}
