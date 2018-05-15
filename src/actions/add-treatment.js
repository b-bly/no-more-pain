import axios from 'axios';
const url = '/injury/add-treatment/';

export default function addTreatment(treatmentObject) {
    return dispatch => {
        console.log('addTreatment action treatment: ');
        console.log(treatmentObject);

        axios.post(url + treatmentObject.injuryId, treatmentObject.treatment).then(res => {
            console.log('addTreatment action res.data');
            console.log(res.data);
            treatmentObject.treatment.upvotes = [];
            treatmentObject.treatment.comments = [];
            dispatch(addTreatmentAsync(treatmentObject.treatment));
            
        }).catch(function (error) {
            console.log('error addTreatment: ');
            console.log(error);
            //To do: error handling
        });
    }
}

function addTreatmentAsync (injuryInfo) {
    return {
        type: 'ADD_TREATMENT',
        payload: injuryInfo
    }
}