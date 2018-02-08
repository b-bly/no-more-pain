import axios from 'axios';
const url = '/user';

export default function signUp(userInfo) {
    return dispatch => {
        console.log('postNewUser action user: ');
        console.log(userInfo);
        axios.post(url, userInfo).then(res => {
            console.log('postNewUser action res.data');
            console.log(res.data);
            dispatch(postNewUserAsync(res.data.username));
        }).catch(function (error) {
            console.log('error postNewUser : ');
            console.log(error);
            dispatch(postNewUserAsync('fail'));
        });
    }
}

function postNewUserAsync (payload) {
    return {
        type: 'POST_NEW_USER',
        payload: payload
    }
}