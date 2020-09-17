import { IPositionsArray } from '../interfaces/interfaces';
import { ActionTypes } from './root/actions';
import { GET_POSITIONS } from './root/types';
 
const initialState: IPositionsArray[] = [];

const positionsReducer = (state: IPositionsArray[] = initialState, action: ActionTypes) => {
    switch(action.type) {
        case GET_POSITIONS: return state.concat(action.payload);

        default: return state;
    }
}

export default positionsReducer;