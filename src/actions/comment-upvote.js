import axios from 'axios';
const url = '/comment/comment-upvote/';

export default function commentUpvote(commentUpvoteData) {
        console.log('commentUpvote action treatment id: ');
        console.log(commentUpvoteData);
        const commentId = commentUpvoteData.commentId;
        const injuryId = commentUpvoteData.injuryId;
        console.log(commentId);
        
    return dispatch => {

        axios.put(url + commentId, commentUpvoteData).then(res => {
            console.log('commentUpvote action res.data');
            console.log(res.data);
            axios.get('/injury/info', {
                params: {
                    id: injuryId
                }
            }).then(res => {
                console.log('commentUpvote get action res.data');
                console.log(res.data);
                dispatch(commentUpvoteAsync(res.data));
            }).catch(function (error) {
                console.log('error commentUpvote get : ');
                console.log(error);
            });
            dispatch(commentUpvoteAsync(res.data));
        }).catch((error) => {
            console.log('error commentUpvote : ');
            console.log(error);
            dispatch(commentUpvoteAsync('fail'));
        });
    }
}

function commentUpvoteAsync(payload) {
    return {
        type: 'GET_INJURY_INFO',
        payload: payload
    }
}