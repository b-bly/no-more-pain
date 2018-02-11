import axios from 'axios';
const url = '/injury/info';

export default function getInjuryInfo(id) {
    return dispatch => {
        console.log('getInjuryInfo action title: ');
        console.log(id);
        
        axios.get(url, {
            params: {
                id: id
            }
        }).then(res => {
            console.log('injuryInfo action res.data');
            console.log(res.data);
            
            dispatch(getInjuryInfoAsync(res.data));
        }).catch(function (error) {
            console.log('error getInjuryInfo : ');
            console.log(error);
        });
    }
}

function getInjuryInfoAsync (injuryInfo) {
    return {
        type: 'GET_INJURY_INFO',
        payload: injuryInfo
    }
}
