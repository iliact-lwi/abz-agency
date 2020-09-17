import { SHOW_BUTTON } from './root/types';
import { ActionTypes } from './root/actions';
import { IUsersActions } from '../interfaces/interfaces';

const initialState: IUsersActions = {
    showButton: true
}

const usersActionsReducer = (state: IUsersActions = initialState, action: ActionTypes) => {
    switch(action.type) {
        case SHOW_BUTTON: return {...state, showButton: action.payload};

        default: return state;
    }
}

export default usersActionsReducer;

