export default function (state = [], action) {
    switch (action.type) {
        case 'ADD_INJURY':
            //return [ ...state.injuryList, action.payload];
            return [action.payload];
        case 'GET_INJURIES_LIST':
            console.log('injuries reducer, action: ');
            console.log({...action.payload});
            return action.payload;                       
        default:
            return state;           
    }
}
//   return {
//                 ...state,
//                 ...action.payload
//             };