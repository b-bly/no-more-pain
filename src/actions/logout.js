import axios from 'axios';
const url = '/user/logout';

export default function login() {
    return dispatch => {
        console.log('login action');
    
        axios.post(url).then(res => {
            console.log('login action res.data');
            console.log(res.data);
            const user = {
                username: '',
                loggedIn: false
            }
            dispatch(postNewUserAsync(user));
        }).catch(function (error) {
            console.log('error login : ');
            console.log(error);
            dispatch(postNewUserAsync('fail'));
        });
    }
}

function postNewUserAsync (payload) {
    return {
        type: 'LOGOUT',
        payload: payload
    }
}