import axios from 'axios';
const url = '/injury/update';
const getUrl = '/injury';
const getInjuryList = './getInjuryList';

export default function updateInjury(injury) {
    return dispatch => {
        console.log('updateInjury action injury: ');
        console.log(injury);
        axios.put(url, injury).then(res => {
            console.log('updateInjury action res.data');
            console.log(res.data);
            //get all data for injury list
            dispatch(getInjuryList);
            
            // axios.get(getUrl)
            // .then(res => {
            //     console.log('got injury list data');
                
            //     dispatch(updateInjuryAsync(res.data));
            // }).catch(function (error) {
            // });  


        }).catch(function (error) {
            console.log('error updateInjury : ');
            console.log(error);
            dispatch(updateInjuryAsync('fail'));
        });
    }
}

function updateInjuryAsync(payload) {
    return {
        type: 'GET_INJURY_LIST',
        payload: payload
    }
}