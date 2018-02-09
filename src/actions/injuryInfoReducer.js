export default function (state = {}, action) {
    switch (action.type) {

        case 'GET_INJURY_INFO':
            // console.log('injuries reducer, action: ');
            // consolt.log(action);
            // console.log(action.payload.treatments[0].comments[0]); //logged out here, but not in injury-info.js

            // [ anonymous {
            //     id: 1,
            //     title: 'High Hamstring Tendonopathy',
            //     description: 'Pain in the butt.',
            //     treatments: 
            //      { name: 'squats',
            //        comments: [Object],
            //        description: 'Do two sets of 20',
            //        upvotes: '0' } } ]
            return action.payload;
            // {
            //     id: action.payload.id,
            //     title: action.payload.title,
            //     description: action.payload.description,
            //     treatments: action.payload.treatments.map((treatment) => {
            //         treatment = Object.assign({}, treatment);
            //         return {
            //             name: treatment.name,
            //             comments: Object.assign([], treatment.comments),
            //             description: treatment.description,
            //             upvotes: treatment.upvotes
            //         }
            //     })
            // };
        default:
            return state;
    }
}