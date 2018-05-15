import axios from 'axios';
const url = '/injury/';

export default function deleteInjury(injuryData) {
    return dispatch => {
        axios.delete(url, {
            params: {
                injuryId: injuryData.injuryId,
                authorId: injuryData.author.id,
            }
        }).then(res => {
            dispatch(deleteInjuryAsync(injuryData));
            
        }).catch( (error) => {
            console.log('error deleteInjury : ');
            console.log(error);
            //To do: better error handling
            //dispatch(deleteInjuryAsync('fail'));
        });
    }
}

function deleteInjuryAsync (payload) {
    return {
        type: 'DELETE_INJURY',
        payload: payload
    }
}