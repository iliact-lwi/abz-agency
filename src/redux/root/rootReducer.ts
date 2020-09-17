import { combineReducers } from 'redux';
import usersReducer from '../usersReducer';
import usersActionsReducer from '../usersActionsReducer';
import positionsReducer from '../positionsReducer';
import validationReducer from '../validationReducer';

const rootReducer = combineReducers({
    users: usersReducer,
    usersActions: usersActionsReducer,
    positions: positionsReducer,
    validation: validationReducer
});

export default rootReducer;