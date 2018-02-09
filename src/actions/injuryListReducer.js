export default function (state = [], action) {
    switch (action.type) {
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