import axios from 'axios';
const url = 'http://localhost:5000/injuries';

export default function getInjuryInfo(title) {
    return dispatch => {
        console.log('getInjuryInfo action title: ');
        console.log(title);
        
        axios.get(`${url}/injuryInfo`, {
            params: {
                title: title
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
