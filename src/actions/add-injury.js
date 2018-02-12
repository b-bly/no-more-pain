import axios from 'axios';
const url = '/injury';

export default function addInjury(injury) {
    return dispatch => {
        console.log('addInjury action injury: ');
        console.log(injury);
        axios.post(url, injury).then(res => {
            console.log('addInjury action res.data');
            console.log(res.data);
            dispatch(addInjuryAsync(res.data));
        }).catch(function (error) {
            console.log('error addInjury : ');
            console.log(error);
            dispatch(addInjuryAsync('fail'));
        });
    }
}

function addInjuryAsync (payload) {
    return {
        type: 'ADD_INJURY',
        payload: payload
    }
}