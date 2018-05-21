import axios from 'axios';
const url = '/comment/add-reply/';

export default function addComment(commentData) {
    return dispatch => {
        console.log('addComment action commentData: ');
        console.log(commentData);
        axios.post(url + commentData.treatment_id, commentData).then(res => {
            console.log('addComment action res.data');
            console.log(res.data);
            dispatch(addCommentAsync(commentData));
          
        }).catch(function (error) {
            console.log('error addComment : ');
            console.log(error);
            // to do: error handling
        });
    }
}

function addCommentAsync (injuryInfo) {
    return {
        type: 'ADD_COMMENT',
        payload: injuryInfo
    }
}