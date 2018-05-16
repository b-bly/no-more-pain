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
        case 'EDIT_INJURY':
            console.log('edit injury reducer');
            console.log(...action.payload);
            return state.map(injury => {
                if (injury._id === action.payload._id) {
                    const updatedInjury = action.payload;
                    updatedInjury.treatments = injury.treatments; //could have passed this in through
                    //the original editInjury function
                    return updatedInjury;
                } else {
                    return injury;
                }
            
            });
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