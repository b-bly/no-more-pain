export default function (state = [], action) {
    switch (action.type) {
        case 'ADD_INJURY':
        console.log('injuryList, state:');
        console.log(state);
        
            return [ ...state, action.payload];
            //return [action.payload];
        case 'GET_INJURIES_LIST':
            console.log('injuries reducer, action: ');
            console.log({...action.payload});
            return action.payload;        
        case 'DELETE_INJURY':
            console.log('injury list reducer, action:');
            console.log(action.payload);
            return state.filter(injury => injury._id !== action.payload.injuryId);
        default:
            return state;           
    }
}
//   return {
//                 ...state,
//                 ...action.payload
//             };