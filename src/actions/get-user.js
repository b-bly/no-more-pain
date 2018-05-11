import axios from 'axios';
const url = '/user/';

export default function getUser() {
    return dispatch => {
        axios.get(url).then(res => {
            const user = {
                username: res.data.user.username,
                id: res.data.user._id,
                loggedIn: true 
            };
            if (!res.data.user.username) user.loggedIn = false;
            dispatch(getUserAsync(user));
        }).catch(function (error) {
            console.log('error get user : ');
            console.log(error);
            const user = {
                loggedIn: false
            }
            dispatch(getUserAsync(user));
        });
    }
}

function getUserAsync (payload) {
    return {
        type: 'GET_USER',
        payload: payload
    }
}