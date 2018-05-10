import axios from 'axios';
const url = '/comment';

//deletes comment 
export default function deleteComment(commentId, injuryId) {
    console.log('***** deleteComment action *******');
    console.log(commentId);
    
    
    return dispatch => {
        axios.delete(url, {
            params: {
                commentId: commentId
            }
        }
        ).then(res => {
            console.log('deleteComment action res.data');
            console.log(res.data);
            //get injury list           
            axios.get('/injury/info', {
                params: {
                    id: injuryId
                }
            })
                .then(res => {
         
                    dispatch(deleteCommentAsync(res.data));
                }).catch(function (error) {
                    console.log('error get injuries');
                    console.log(error);
                    if (error.response.status === 404) {
                        alert('Restart the server!');
                    }
                });

        }).catch((error) => {
            console.log('error deleteComment : ');
            console.log(error);
            dispatch(deleteCommentAsync('fail'));
        });
    }
}

function deleteCommentAsync(payload) {
    return {
        type: 'DELETE_TREATMENT',
        payload: payload
    }
}