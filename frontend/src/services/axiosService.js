import { useEffect, useState } from 'react';
import axios from 'axios';
import { backendConfig } from '../config';
import { logout } from '../redux/reducers/authSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const useAxiosGet = (path) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate('/');
    const [reRender, setReRender] = useState(false)
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendConfig.baseUrl}${path}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(response.data);
            } catch (err) {
                console.error(err);
                if (err.response.status === 401) {
                    localStorage.clear()
                    dispatch(logout());
                    navigate('/login');
                }
                setError(err.response.data.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [path, reRender]);

    return { data, loading, error, setReRender, reRender };
};

const useAxiosPost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postRequest = async (path, data) => {
        try {
            setLoading(true);
            const response = await axios.post(`${backendConfig.baseUrl}${path}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${backendConfig.token}`,
                },
            });
            return response.data;
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { postRequest, loading, error };
};

const useAxiosPut = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const putRequest = async (path, data) => {
        try {
            setLoading(true);
            const response = await axios.put(`${backendConfig.baseUrl}${path}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${backendConfig.token}`,
                },
            });
            return response.data;
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { putRequest, loading, error };
};

export { useAxiosGet, useAxiosPost, useAxiosPut };

