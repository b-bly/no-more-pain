import axios from 'axios';
const url = '/user/logout';

export default function logout() {
    return dispatch => {
        console.log('logout action');
    
        axios.post(url).then(res => {
            console.log('logout action res.data');
            console.log(res.data);
            const user = {
                username: '',
                id: '',
                loggedIn: false,
                error: null,
            }
            dispatch(logoutAsync(user));
        }).catch(function (error) {
            console.log('error logout : ');
            console.log(error);
            const user = {
                loggedIn: false,
                error: 'logout',
            };
            dispatch(logoutAsync(user));
        });
    }
}

function logoutAsync (payload) {
    return {
        type: 'LOGOUT',
        payload: payload
    }
}