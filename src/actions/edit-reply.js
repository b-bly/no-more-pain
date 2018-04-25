import axios from 'axios';
const url = '/comment/';

export default function editReply(commentObj) {
            console.log('editReply action comment: ');
        console.log(commentObj);
    return dispatch => {

        axios.put(url, commentObj).then(res => {
            console.log('editReply action res.data');
            console.log(res.data);

            axios.get('/injury/info', {
                params: {
                    id: commentObj.injuryId
                }
            }).then(res => {
                console.log('editReply get action res.data');
                console.log(res.data);

                dispatch(editReplyAsync(res.data));
            }).catch(function (error) {
                console.log('error editReply get : ');
                console.log(error);
            });

            dispatch(editReplyAsync(res.data));
        }).catch((error) => {
            console.log('error editReply : ');
            console.log(error);
            dispatch(editReplyAsync('fail'));
        });
    }
}

function editReplyAsync(payload) {
    return {
        type: 'GET_INJURY_INFO',
        payload: payload
    }
}