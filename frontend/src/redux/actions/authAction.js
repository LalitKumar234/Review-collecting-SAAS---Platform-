import axios from 'axios';
import { userLoaded } from '../reducers/authSlice';
import { backendConfig } from '../../config';

export const login = (userDetails) => async dispatch => {
    axios.post(`${backendConfig.baseUrl}auth/login`, userDetails)
        .then((res) => {
            console.log(res.data)
            navigate('/')
            dispatch(userLoaded(data.user));
            localStorage.setItem('userDetails', JSON.stringify({
                email: res.data.user.email,
                username: res.data.user?.username,
            }))
            localStorage.setItem('token', res.data.tokens.access.token)
        })
        .catch((error) => {
            console.log(error)
            dispatch(loginFailed(error));
        })
};