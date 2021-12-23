import { AxiosRequestConfig, AxiosResponse } from "axios";
import { getUniqueId } from "react-native-device-info";

export async function AuthInterceptor(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    try {
        config.headers!["X-Device-Id"] = getUniqueId();
    } catch (ignored) {
    }
    return config;
}

export function RequestLogger(config: AxiosRequestConfig): AxiosRequestConfig {
    let logString = `${config.method?.toUpperCase()} ${config.baseURL}${config.url}`;
    if (config.params) {
        const queryParamString = Object.keys(config.params).map(paramName => {
            const paramValue = config.params[paramName];
            return `${paramName}=${paramValue}`;
        }).join("&");
        logString += `?${queryParamString}`;
    }
    console.log(logString);
    return config;
}

export function ResponseBodyLogger(resp: AxiosResponse): AxiosResponse {
    console.log(JSON.stringify(resp.data));
    return resp;
}

export function ResponseSummaryLogger(resp: AxiosResponse): AxiosResponse {
    const method = resp.config.method!.toUpperCase();
    console.log(`${resp.status} ${method} ${resp.config.url}`);
    return resp;
}
