import axios from 'axios';
const url = '/injury/update';

export default function updateInjury(injury) {
    return dispatch => {
        console.log('updateInjury action injury: ');
        console.log(injury);

        axios.put(url, injury).then(res => {
            console.log('updateInjury action res.data');
            console.log(res.data);
            dispatch(updateInjuryAsync(injury)); 
        }).catch(function (error) {
            console.log('error updateInjury : ');
            console.log(error);
            dispatch(updateInjuryAsync('fail'));
        });
    }
}

function updateInjuryAsync(payload) {
    return {
        type: 'EDIT_INJURY',
        payload: payload
    }
}