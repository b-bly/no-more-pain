import axios from 'axios';
const url = '/comment/add-reply/';

export default function addReply(replyObject) {
    return dispatch => {
        console.log('addReply action replyObject: ');
        console.log(replyObject);
        axios.post(url + replyObject.treatment_id, replyObject).then(res => {
            console.log('addReply action res.data');
            console.log(res.data);
            dispatch(addReplyAsync(replyObject));
          
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