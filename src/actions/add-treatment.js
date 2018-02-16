import axios from 'axios';
const url = '/treatment/add-treatment';

export default function addTreatment(treatment) {
    return dispatch => {
        console.log('addTreatment action treatment: ');
        console.log(treatment);
        axios.post(url, treatment).then(res => {
            console.log('addTreatment action res.data');
            console.log(res.data);
            dispatch(addTreatmentAsync(res.data));
        }).catch(function (error) {
            console.log('error addTreatment : ');
            console.log(error);
            dispatch(addTreatmentAsync('fail'));
        });
    }
}

function addTreatmentAsync (payload) {
    return {
        type: 'ADD_TREATMENT',
        payload: payload
    }
}