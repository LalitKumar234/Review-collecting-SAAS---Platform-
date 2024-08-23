import { useSelector } from "react-redux";
import { useEffect } from "react";
import { axiosPrivate } from "../config/http"

const useAxiosPrivate = () => {
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
        };
    }, [token]);

    return axiosPrivate;
};

export default useAxiosPrivate;