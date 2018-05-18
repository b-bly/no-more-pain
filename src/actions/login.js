import axios from 'axios';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';
const url = '/user/login';

export default function login(userInfo) {
    return dispatch => {
        console.log('login action user: ');
        console.log(userInfo);
        axios.post(url, userInfo).then(res => {
            console.log('login action res.data');
            console.log(res.data);
            const user = {
                username: res.data.username,
                id: res.data._id,
                loggedIn: true,
                error: null,
            }
            dispatch(loginAsync(user));
        }).catch(function (error) {
            console.log('error login : ');
            console.log(error);
            const user = {
                loggedIn: false,
                error: error
            };
            dispatch(loginAsync(user));
        });
    }
}

function loginAsync (payload) {
    return {
        type: 'LOGIN',
        payload: payload
    }
}