import axios from 'axios';
const url = '/injury/edit-treatment';

export default function editTreatment(newTreatment) {
    console.log('editTreatment action treatment: ');
    console.log(newTreatment);
    return dispatch => {

        axios.put(url, newTreatment).then(res => {
            console.log('editTreatment action res.data');
            console.log(res.data);
            dispatch(editTreatmentAsync(newTreatment));

        }).catch((error) => {
            console.log('error editTreatment : ');
            console.log(error);
            dispatch(editTreatmentAsync('fail'));
        });
    }
}

function editTreatmentAsync(payload) {
    return {
        type: 'EDIT_TREATMENT',
        payload: payload
    }
}