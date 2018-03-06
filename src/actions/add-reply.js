import axios from 'axios';
const url = '/injury/add-reply/';

export default function addReply(replyObject) {
    return dispatch => {
        console.log('addReply action replyObject: ');
        console.log(replyObject);
        axios.post(url + replyObject.injury_id, replyObject).then(res => {
            console.log('addReply action res.data');
            console.log(res.data);
            //dispatch(addReplyAsync(res.data));
            axios.get('injury/info', {
                params: {
                    id: replyObject.injury_id
                }
            }).then(res => {
                console.log('add-reply, get action res.data');
                console.log(res.data);
                
                dispatch(addReplyAsync(res.data));
            }).catch(function (error) {
                console.log('error getInjuryInfo in addReply: ');
                console.log(error);
            });

        }).catch(function (error) {
            console.log('error addReply : ');
            console.log(error);
            dispatch(addReplyAsync('fail'));
        });
    }
}

function addReplyAsync (injuryInfo) {
    return {
        type: 'ADD_REPLY',
        payload: injuryInfo
    }
}