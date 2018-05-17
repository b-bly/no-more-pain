import axios from 'axios';
const url = '/comment/';

export default function editComment(commentData) {
    console.log('editComment action comment: ');
    console.log(commentData);
    return dispatch => {

        axios.put(url, commentData).then(res => {
            console.log('editComment action res.data');
            console.log(res.data);

            dispatch(editCommentAsync(commentData));

        }).catch((error) => {
            console.log('error editComment : ');
            console.log(error);
            // To do: error handling
        });
    }
}

function editCommentAsync(payload) {
    return {
        type: 'EDIT_COMMENT',
        payload: payload
    }
}