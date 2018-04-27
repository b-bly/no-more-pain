import axios from 'axios';
const url = '/injury/edit-treatment';

export default function editTreatment(newTreatment) {
            console.log('editTreatment action treatment: ');
        console.log(newTreatment);
    return dispatch => {

        axios.put(url + newTreatment.injuryId, newTreatment).then(res => {
            console.log('editTreatment action res.data');
            console.log(res.data);
            axios.get('/injury/info', {
                params: {
                    id: newTreatment.injuryId
                }
            }).then(res => {
                console.log('editTreatment get action res.data');
                console.log(res.data);
                dispatch(editTreatmentAsync(res.data));
            }).catch(function (error) {
                console.log('error editTreatment get : ');
                console.log(error);
            });
            dispatch(editTreatmentAsync(res.data));
        }).catch((error) => {
            console.log('error editTreatment : ');
            console.log(error);
            dispatch(editTreatmentAsync('fail'));
        });
    }
}

function editTreatmentAsync(payload) {
    return {
        type: 'GET_INJURY_INFO',
        payload: payload
    }
}