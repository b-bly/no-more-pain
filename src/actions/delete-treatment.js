import axios from 'axios';
const url = '/injury/info';

//deletes treatment and comments
export default function deleteTreatment(treatmentData) {
    // from treatments.js:
    //const treatmentData = {
        //     treatmentId: this.props.treatment._id,
        //     injuryId: this.props.injuryId,
        //     authorId: this.props.treatment.author._id
        // }
    return dispatch => {

        axios.put(url, treatmentData).then(res => {
            console.log('deleteTreatment action res.data');
            console.log(res.data);
            dispatch(deleteTreatmentAsync(treatmentData));
            
        }).catch((error) => {
            console.log('error deleteTreatment : ');
            console.log(error);
            // ***** to do: error handling *****
        });
    }
}

function deleteTreatmentAsync (payload) {
    return {
        type: 'DELETE_TREATMENT',
        payload: payload
    }
}