import axios from 'axios';
const url = '/comment/comment-upvote/';

export default function commentUpvote(commentUpvoteData) {
        console.log('commentUpvote action treatment id: ');
        console.log(commentUpvoteData);
        //from comments.js
        // const commentData = {
            // {username: "al", id: "5a7ddf840898fd83b5c6b3bb"}
            // injury_id
            // :
            // "5af4d63f2e1dba9509e1b25f"
            // parent_id
            // :
            // null
            // posted
            // :
            // "2018-05-14T22:06:17.944Z"
            // text
            // :
            // "did it work?↵"
            // treatment_id
            // :
            // "5af
        // };
        const commentId = commentUpvoteData._id;
        console.log(commentId);
    return dispatch => {
        axios.put(url + commentId, commentUpvoteData).then(res => {
            console.log('commentUpvote action res.data');
            console.log(res.data);
            dispatch(commentUpvoteAsync(res.data))
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