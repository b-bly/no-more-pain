import axios from 'axios';
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
                loggedIn: true
            }
            dispatch(loginAsync(user));
        }).catch(function (error) {
            console.log('error login : ');
            console.log(error);
            dispatch(loginAsync('fail'));
        });
    }
}

function loginAsync (payload) {
    return {
        type: 'LOGIN',
        payload: payload
    }
}