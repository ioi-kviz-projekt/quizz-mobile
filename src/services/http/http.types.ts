import { AxiosRequestConfig } from "axios";

export interface HttpClientOptions {
    logging?: {
        requests?: {
            url?: boolean;
        };
        response?: {
            summary?: boolean;
            body?: boolean;
        };
    };
    request?: {
        interceptors?: ((config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>)[];
    };
}

export type HeaderEntry = { [header: string]: string };
export type QueryParamsEntry = { [queryParam: string]: string };

export interface HttpOptions {
    headers?: HeaderEntry;
    queryParams?: QueryParamsEntry;
}
