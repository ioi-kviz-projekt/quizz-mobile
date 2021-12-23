import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { HttpClientOptions, HttpOptions } from "./http.types";
import { from, Observable } from "rxjs";
import { AuthInterceptor, RequestLogger, ResponseBodyLogger, ResponseSummaryLogger } from "./interceptors";

export class HttpClient {
    
    private readonly http: AxiosInstance;
    private readonly clientUrl: string;
    
    public static newClient(url: string, options?: HttpClientOptions): HttpClient {
        return new HttpClient(url, options);
    }
    
    private constructor(url: string, options?: HttpClientOptions) {
        this.clientUrl = url;
        this.http = axios.create({
            baseURL: url,
            responseType: "json",
        });
        
        this.registerRequestInterceptors(options);
        this.registerResponseInterceptors(options);
    }
    
    public get baseUrl(): string {
        return this.clientUrl;
    }
    
    public request<B, E>(method: Method, url: string, body?: B, options?: HttpOptions): Observable<AxiosResponse<E>> {
        const config: AxiosRequestConfig = {
            method,
            url,
        };
        
        if (options && options.headers) {
            config.headers = options.headers;
        }
        
        if (options && options.queryParams) {
            config.params = options.queryParams;
        }
        
        if (body) {
            config.data = body;
        }
        
        return from(this.http.request(config));
    }
    
    public get<E>(url: string, options?: HttpOptions): Observable<AxiosResponse<E>> {
        return this.request("get", url, null, options);
    }
    
    public post<B, E>(url: string, body: B, options?: HttpOptions): Observable<AxiosResponse<E>> {
        return this.request("post", url, body, options);
    }
    
    public delete<E>(url: string, options?: HttpOptions): Observable<AxiosResponse<E>> {
        return this.request("delete", url, null, options);
    }
    
    public put<B, E>(url: string, body: B, options?: HttpOptions): Observable<AxiosResponse<E>> {
        return this.request("put", url, body, options);
    }
    
    public patch<B, E>(url: string, body: B, options?: HttpOptions): Observable<AxiosResponse<E>> {
        return this.request("patch", url, body, options);
    }
    
    private registerResponseInterceptors(options?: HttpClientOptions): void {
        if (options && options.logging && options.logging.response && options.logging.response.summary) {
            this.http.interceptors.response.use(ResponseSummaryLogger);
        }
        // If enabled, register response body logging
        if (options && options.logging && options.logging.response && options.logging.response.body) {
            this.http.interceptors.response.use(ResponseBodyLogger);
        }
    }
    
    private registerRequestInterceptors(options?: HttpClientOptions): void {
        // Register given interceptors. If none defined (or empty array), apply AuthInterceptor
        if (options && options.request && options.request.interceptors) {
            options.request.interceptors.forEach(interceptor => {
                this.http.interceptors.request.use(interceptor);
            });
        } else {
            this.http.interceptors.request.use(AuthInterceptor);
        }
        
        // If enabled, register request logging
        if (options && options.logging && options.logging.requests && options.logging.requests.url) {
            this.http.interceptors.request.use(RequestLogger);
        }
    }
    
}
