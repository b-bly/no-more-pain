import axios from 'axios';
const url = '/comment';

//deletes comment 
export default function deleteComment(commentData) {
    console.log('***** deleteComment action *******');
    console.log(commentData);
    // from comment.js
    // const commentData = {
    //     treatmentId = this.props.treatment._id,
    //     commentId = this.props.id,
    // }
    return dispatch => {

        axios.delete(url, {
            params: {
                commentId: commentData.commentId
            }
        }
        ).then(res => {
            console.log('deleteComment action res.data');
            console.log(res.data);
            dispatch(deleteCommentAsync(commentData))
  

        }).catch((error) => {
            console.log('error deleteComment : ');
            console.log(error);
            dispatch(deleteCommentAsync('fail'));
        });
    }
}

function deleteCommentAsync(payload) {
    return {
        type: 'DELETE_COMMENT',
        payload: payload
    }
}