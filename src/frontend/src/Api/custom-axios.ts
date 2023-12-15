import axios from 'axios';
import Axios, { AxiosRequestConfig } from 'axios';

console.log(import.meta.env.VITE_APP_BACKEND_ADDRESS);
const AXIOS_INSTANCE = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_ADDRESS,
}); // use your own URL here or environment variable

export const customInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig
): Promise<T> => {
    const source = Axios.CancelToken.source();
    const promise = AXIOS_INSTANCE({
        ...config,
        ...options,
        cancelToken: source.token,
    }).then(({ data }) => data);

    // @ts-ignore
    promise.cancel = () => {
        source.cancel('Query was cancelled');
    };

    return promise;
};
