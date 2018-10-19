import { combineReducers } from 'redux';
import loans from './loans';
import applications from './applications';
import user from './user';
import facilities from './facilities';
import persons from './persons';
import workers from './workers';
import investments from './investments';

const reducer = combineReducers({
    loans,
    applications,
    investments,
    workers,
    persons,
    facilities,
    user
});

export default reducer;