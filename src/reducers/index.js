import { combineReducers } from 'redux';
import applications from './applications';
import investments from './investments';
import facilities from './facilities';
import documents from './documents';
import workers from './workers';
import persons from './persons';
import loans from './loans';
import user from './user';

const reducer = combineReducers({
    applications,
    investments,
    facilities,
    documents,
    workers,
    persons,
    loans,
    user
});

export default reducer;