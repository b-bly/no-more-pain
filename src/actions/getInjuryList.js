import axios from 'axios';
const url = '/injury';

export default function getInjuryList() {
    return dispatch => {
        axios.get(`${url}`)
            .then(res => {
                console.log('get injuries');
                console.log(res.data);
                dispatch(getInjuriesListAsync(res.data));
            }).catch(function (error) {
                console.log('error get injuries');
                console.log(error);
              if (error.response.status === 404) {
                alert('Restart the server!');
              }
            });
    }
}

function getInjuriesListAsync(injuryList) {
    
    // console.log('getInjuryList action, data: ');
    // console.log(injuryList);
    return {
        type: 'GET_INJURIES_LIST',
        payload: injuryList
    };
}
