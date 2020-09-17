import { SHOW_MORE_USERS, CLEAR_USERS } from './root/types';
import { IListUsers } from '../interfaces/interfaces';
import { ActionTypes } from './root/actions';

const initialState: IListUsers[] = [];

const usersReducer = (state: IListUsers[] = initialState, action: ActionTypes) => {
    switch(action.type) {
        case SHOW_MORE_USERS: return (function() {
            let payloadArr: IListUsers[] = action.payload.map(item => item);

            for(let i: number = 0; i < state.length; i++) {
                payloadArr = payloadArr.filter(item => {
                    return state[i].id !== item.id;
                });
            }
            return state.concat(payloadArr);
        })();
        case CLEAR_USERS: return action.payload;
        
        default: return state;
    }
}

export default usersReducer