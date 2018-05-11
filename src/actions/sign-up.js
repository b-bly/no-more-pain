import axios from 'axios';
const url = '/user';

export default function signUp(userInfo) {
    return dispatch => {
        console.log('postNewUser action user: ');
        console.log(userInfo);
        axios.post(url, userInfo).then(res => {
            console.log('postNewUser action res.data');
            console.log(res.data);
            const user = {
                username: res.data.username,
                loggedIn: false
            }
            dispatch(postNewUserAsync(user));
        }).catch(function (error) {
            console.log('error postNewUser : ');
            console.log(error);
            const user = {
                loggedIn: false
            };
            dispatch(postNewUserAsync(user));
        });
    }
}

function postNewUserAsync (payload) {
    return {
        type: 'POST_NEW_USER',
        payload: payload
    }
}