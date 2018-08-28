import { combineReducers } from 'redux';
import loans from './loans';
import applications from './applications';
import user from './user';

const reducer = combineReducers({
    loans,
    applications,
    user
});

export default reducer;