import axios from 'axios';
const url = '/user/';

export default function login() {
    return dispatch => {
        console.log('get user action user: ');
        console.log();
        axios.get(url).then(res => {
            console.log('get user action res.data');
            console.log(res.data);
            const user = {
                username: res.data.user.username,
                loggedIn: true 
            };
            if (!res.data.user.username) user.loggedIn = false;
            dispatch(postNewUserAsync(user));
        }).catch(function (error) {
            console.log('error get user : ');
            console.log(error);
            dispatch(postNewUserAsync('fail'));
        });
    }
}

function postNewUserAsync (payload) {
    return {
        type: 'GET_USER',
        payload: payload
    }
}