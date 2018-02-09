import { combineReducers } from 'redux';
import user from './user-reducer';
import injuryList from './injury-list-reducer';

const rootReducer = combineReducers({
    user,
    injuryList
});

export default rootReducer;