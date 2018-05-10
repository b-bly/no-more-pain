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
            console.log('deleteInjury action res.data');
            console.log(res.data);
            //get injury list
            
                axios.get('/injury')
                    .then(res => {
                        // console.log('get injuries');
                        // console.log(res.data);
                        dispatch(deleteInjuryAsync(res.data));
                    }).catch(function (error) {
                        console.log('error get injuries');
                        console.log(error);
                      if (error.response.status === 404) {
                        alert('Restart the server!');
                      }
                    });
            
        }).catch( (error) => {
            console.log('error deleteInjury : ');
            console.log(error);
            dispatch(deleteInjuryAsync('fail'));
        });
    }
}

function deleteInjuryAsync (payload) {
    return {
        type: 'DELETE_INJURY',
        payload: payload
    }
}