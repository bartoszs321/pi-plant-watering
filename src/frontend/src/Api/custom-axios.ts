import axios from 'axios';
import Axios, { AxiosRequestConfig } from 'axios';
export const AXIOS_INSTANCE = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_ADDRESS,
});

export const useCustomAxios = <T>(config: AxiosRequestConfig, token?: any) => {
    const customAxios = async (): Promise<T> => {
        const access_token = token;
        const { data } = await AXIOS_INSTANCE({
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${access_token}`,
            },
        });
        return data;
    };
    return customAxios;
};
