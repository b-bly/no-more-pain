export default function (state = [], action) {
    switch (action.type) {
        case 'GET_INJURY_INFO':
            // console.log('injury info reducer, payload:');
            // console.log(action.payload);           
            return action.payload;
        case 'ADD_TREATMENT':
            //const newState = state.treatments.
            return {
                ...state,
                treatments: [
                    ...state.treatments,
                    action.payload
                ]
            };
        case 'ADD_REPLY':
            return state;
        case 'DELETE_TREATMENT':
            return action.payload;
        default:
            return state;
    }
}


            // [ anonymous {
            //     id: 1,
            //     title: 'High Hamstring Tendonopathy',
            //     description: 'Pain in the butt.',
            //     treatments: 
            //      { name: 'squats',
            //        comments: [Object],
            //        description: 'Do two sets of 20',
            //        upvotes: [] } } ]