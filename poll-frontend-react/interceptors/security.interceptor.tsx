import { SecurityContext } from "@/app/layout";
import axios from "axios";
import { ReactNode, useContext, useEffect, useRef } from "react";

export default function SecurityInterceptor({ children }: { children : ReactNode }) {

    const { connectedUser, refresh } = useContext(SecurityContext);
    const requestInterceptorId  = useRef<number>();
    const responseInterceptorId  = useRef<number>();

    useEffect(() => {
        if (requestInterceptorId.current) {
            axios.interceptors.response.eject(requestInterceptorId.current);
            requestInterceptorId.current = undefined;
        }
        if (responseInterceptorId.current) {
            axios.interceptors.response.eject(responseInterceptorId.current);
            responseInterceptorId.current = undefined;
        }
        if (connectedUser !== undefined) {
            requestInterceptorId.current = axios.interceptors.request.use(config => {
                console.log("intercept !")
                if (!config.url?.endsWith('authenticate') &&
                    config.headers['Authorization'] == undefined)
                    config.headers['Authorization'] = 'Bearer ' + connectedUser.accessToken;
                    return config;
            });

            responseInterceptorId.current = axios.interceptors.response.use(
                res => res,
                async error => {
                    const originalRequest = error.config;
                    if (error.response.status === 401 &&
                        !originalRequest._retry &&
                        !originalRequest.url?.endsWith('authenticate')) {
                            const newAccessToken = await refresh();
                            originalRequest._retry = true;
                            console.log("interceptor: " + newAccessToken);
                            originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
                            return axios(originalRequest);
                        }
            });
        }
    }, [ connectedUser, refresh ]);
    
    return <>{children}</>;
}