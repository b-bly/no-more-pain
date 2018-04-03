import axios from 'axios';
const url = '/injury/info';

//deletes treatment and comments
export default function deleteTreatment(treatmentId, injuryId) {
    return dispatch => {
        axios.put(url, 
            {
                treatmentId: treatmentId,
                injuryId: injuryId
            }
        ).then(res => {
            console.log('deleteTreatment action res.data');
            console.log(res.data);
            //get injury list           
                axios.get('/injury/info')
                    .then(res => {
                        // console.log('get injuries');
                        // console.log(res.data);
                        dispatch(deleteTreatmentAsync(res.data));
                    }).catch(function (error) {
                        console.log('error get injuries');
                        console.log(error);
                      if (error.response.status === 404) {
                        alert('Restart the server!');
                      }
                    });
            
        }).catch((error) => {
            console.log('error deleteTreatment : ');
            console.log(error);
            dispatch(deleteTreatmentAsync('fail'));
        });
    }
}

function deleteTreatmentAsync (payload) {
    return {
        type: 'DELETE_TREATMENT',
        payload: payload
    }
}