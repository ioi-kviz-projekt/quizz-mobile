import { HttpClient } from "./http.client";
import { HttpClientOptions } from "./http.types";

export abstract class HttpService {
    
    protected readonly baseUrl: string;
    
    protected readonly httpClient: HttpClient;
    
    protected constructor(url: string, options?: HttpClientOptions) {
        this.baseUrl = url;
        this.httpClient = HttpClient.newClient(url, options);
    }
    
    /**
     * Get http client instance.
     * @protected
     */
    protected get http(): HttpClient {
        return this.httpClient;
    }
    
    /**
     * Get base url of a service.
     * @protected
     * @returns base url of a service
     */
    protected get apiUrl(): string {
        return this.httpClient.baseUrl;
    }
    
}
