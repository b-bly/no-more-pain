import { combineReducers } from 'redux';
import user from './user-reducer';
import injuryList from './injury-list-reducer';
import injuryInfo from './injury-info-reducer'

const rootReducer = combineReducers({
    user,
    injuryList,
    injuryInfo
});

export default rootReducer;