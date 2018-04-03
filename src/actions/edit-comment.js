import axios from 'axios';
const url = '/comment/edit';

export default function editComment(commentObj) {
    return dispatch => {
        console.log('editComment action comment: ');
        console.log(commentObj);
        axios.put(url, commentObj).then(res => {
            console.log('editComment action res.data');
            console.log(res.data);

            axios.get('/injury/info', {
                params: {
                    id: commentObj.injuryId
                }
            }).then(res => {
                console.log('editComment get action res.data');
                console.log(res.data);

                dispatch(editCommentAsync(res.data));
            }).catch(function (error) {
                console.log('error editComment get : ');
                console.log(error);
            });

            dispatch(editCommentAsync(res.data));
        }).catch((error) => {
            console.log('error editComment : ');
            console.log(error);
            dispatch(editCommentAsync('fail'));
        });
    }
}

function editCommentAsync(payload) {
    return {
        type: 'GET_INJURY_INFO',
        payload: payload
    }
}