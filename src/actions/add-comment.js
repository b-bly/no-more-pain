import axios from 'axios';
const url = '/comment/add-reply/';

export default function addComment(replyObject) {
    return dispatch => {
        console.log('addComment action replyObject: ');
        console.log(replyObject);
        axios.post(url + replyObject.treatment_id, replyObject).then(res => {
            console.log('addComment action res.data');
            console.log(res.data);
            dispatch(addCommentAsync(replyObject));
          
        }).catch(function (error) {
            console.log('error addComment : ');
            console.log(error);
            dispatch(addCommentAsync('fail'));
        });
    }
}

function addCommentAsync (injuryInfo) {
    return {
        type: 'ADD_REPLY',
        payload: injuryInfo
    }
}