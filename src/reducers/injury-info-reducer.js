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

        case 'DELETE_TREATMENT':
            return {
                ...state,
                treatments: state.treatments.filter(treatment => treatment._id !== action.payload.treatmentId)
            };
        case 'EDIT_TREATMENT':
            return {
                ...state,
                treatments: state.treatments.map(treatment => {
                    if (treatment._id === action.payload._id) {
                        //check action.payload 
                        return action.payload; //edited treatment
                    }
                    return treatment;
                })
            }
        case 'ADD_COMMENT':
            return {
                ...state,
                treatments: state.treatments.map(treatment => {
                    if (treatment._id === action.payload.treatment_id) {
                        const updatedTreatment = Object.assign({}, treatment);
                        updatedTreatment.comments = [
                            ...treatment.comments,
                            action.payload
                        ]
                        return updatedTreatment;
                    };
                    return treatment;
                })
            };


        case 'DELETE_COMMENT':
            console.log('DELETE_COMMENT reducer, action.payload:');
            console.log(action.payload);

            return {
                ...state,
                treatments: state.treatments.map(treatment => {
                    if (treatment._id === action.payload.treatmentId) {
                        return {
                            ...treatment,
                            comments: treatment.comments.filter((comment) => {
                                console.log(comment);

                                if (comment._id === action.payload.commentId) {
                                    return false;
                                }
                                return true;
                            })
                        }
                    }
                    return treatment;
                })
            };
        case 'EDIT_COMMENT':
            return {
                ...state,
                treatments: state.treatments.map(treatment => {
                    if (treatment._id === action.payload.treatment_id) {
                        return {
                            ...treatment,
                            comments: treatment.comments.map((comment) => {
                                if (comment._id === action.payload._id) {
                                    return action.payload
                                }
                                return comment;
                            })
                        }
                    }
                    return treatment;
                })
            };
        case 'COMMENT_UPVOTE':
            //from comments.js
            // const commentData = {
            //     injuryId: this.props.injuryId,
            //     commentId: commentId,
            //     author: this.props.user,
            //     treatment_id: this.props.treatment._id,
            // };
            return {
                ...state,
                treatments: state.treatments.map(treatment => {
                    if (treatment._id === action.payload.treatment_id) {
                        return {
                            ...treatment,
                            comments: treatment.comments.map((comment) => {
                                if (comment._id === action.payload._id) {
                                    return action.payload
                                }
                                return comment;
                            })
                        }
                    }
                    return treatment;
                })
            };
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