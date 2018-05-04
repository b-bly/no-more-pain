import axios from 'axios';
const url = '/injury/treatment-upvote';

export default function treatmentUpvote(treatmentUpvoteData) {
        console.log('treatmentUpvote action treatment id: ');
        console.log(treatmentUpvoteData);
        const treatmentId = treatmentUpvoteData.treatmentId;
        const injuryId = treatmentUpvoteData.injuryId
    return dispatch => {

        axios.put(url + injuryId, treatmentUpvoteData).then(res => {
            console.log('treatmentUpvote action res.data');
            console.log(res.data);
            axios.get('/injury/info', {
                params: {
                    id: injuryId
                }
            }).then(res => {
                console.log('treatmentUpvote get action res.data');
                console.log(res.data);
                dispatch(treatmentUpvoteAsync(res.data));
            }).catch(function (error) {
                console.log('error treatmentUpvote get : ');
                console.log(error);
            });
            dispatch(treatmentUpvoteAsync(res.data));
        }).catch((error) => {
            console.log('error treatmentUpvote : ');
            console.log(error);
            dispatch(treatmentUpvoteAsync('fail'));
        });
    }
}

function treatmentUpvoteAsync(payload) {
    return {
        type: 'GET_INJURY_INFO',
        payload: payload
    }
}