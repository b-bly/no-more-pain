import axios from 'axios';
const url = '/comment/comment-upvote/';

export default function commentUpvote(commentUpvoteData) {
        console.log('commentUpvote action treatment id: ');
        console.log(commentUpvoteData);
        //from comments.js
        // const commentData = {
        //     injuryId: this.props.injuryId,
        //     commentId: commentId,
        //     author: this.props.user,
        //     treatment_id: this.props.treatment._id,
        // };
        const commentId = commentUpvoteData.commentId;
        const injuryId = commentUpvoteData.injuryId;
        console.log(commentId);
    return dispatch => {
        axios.put(url + commentId, commentUpvoteData).then(res => {
            console.log('commentUpvote action res.data');
            console.log(res.data);
            dispatch(commentUpvoteAsync(commentUpvoteData))
        }).catch((error) => {
            console.log('error commentUpvote: ');
            console.log(error);
            //to do: error handling
        });
    }
}

function commentUpvoteAsync(payload) {
    return {
        type: 'COMMENT_UPVOTE',
        payload: payload
    }
}