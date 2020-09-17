import { IValidation } from '../interfaces/interfaces';
import { ActionTypes } from './root/actions';
import { SHOW_ALERT, HIDE_ALERT, POST_SUCCESS, POST_FAILED, SHOW_PROGRESS } from './root/types';
 
const initialState: IValidation = {
    showAlert: '',
    postSuccess: false,
    postFailed: '',
    showProgress: false
}

const validationReducer = (state: IValidation = initialState, action: ActionTypes) => {
    switch(action.type) {
        case SHOW_ALERT: return {...state, showAlert: action.payload};
        case HIDE_ALERT: return {...state, showAlert: action.payload};
        case POST_SUCCESS: return {...state, postSuccess: action.payload, postFailed: !action.payload};
        case POST_FAILED: return {...state, postFailed: action.payload, postSuccess: !action.payload};
        case SHOW_PROGRESS: return {...state, showProgress: action.payload};

        default: return state;
    }
}

export default validationReducer;