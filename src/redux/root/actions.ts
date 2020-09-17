import { SHOW_MORE_USERS, SHOW_BUTTON, GET_POSITIONS, SHOW_ALERT, HIDE_ALERT, POST_SUCCESS, POST_FAILED, CLEAR_USERS, SHOW_PROGRESS } from "./types";
import { IListUsers, IResponseShowMoreUsers, IGetPosition, IPositionsArray, IGetToken, IClearForm } from "../../interfaces/interfaces";
import { ThunkAction } from 'redux-thunk';

// local storage
const usersResponseStorage = {
    currentUrl: 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6'
}

// types for return actions
type showMoreUsersCurrentActionType = {
    type: typeof SHOW_MORE_USERS
    payload: IListUsers[]
}

type showButtonActionType = {
    type: typeof SHOW_BUTTON
    payload: boolean
}

type getPositionsCurrentActionType = {
    type: typeof GET_POSITIONS
    payload: IPositionsArray[]
}

type showAlertCurrentActionType = {
    type: typeof SHOW_ALERT
    payload: string
}

type hideAlertActionType = {
    type: typeof HIDE_ALERT
    payload: string
}

type postSuccessActionType = {
    type: typeof POST_SUCCESS
    payload: boolean
}

type postFailedActionType = {
    type: typeof POST_FAILED
    payload: string
}

type clearUsersAfterPostActionType = {
    type: typeof CLEAR_USERS
    payload: IListUsers[]
}

type showProgressBarActionType = {
    type: typeof SHOW_PROGRESS
    payload: boolean
}
// actions
const showMoreUsersCurrent = (payload: IListUsers[]): showMoreUsersCurrentActionType => {
    return {
        type: SHOW_MORE_USERS,
        payload: payload
    }
}

const showButton = (isShow: boolean): showButtonActionType => {
    return {
        type: SHOW_BUTTON,
        payload: isShow
    }
}

const getPositionsCurrent = (positions: IPositionsArray[]): getPositionsCurrentActionType => {
    return {
        type: GET_POSITIONS,
        payload: positions
    }
}

const showAlertCurrent = (message: string): showAlertCurrentActionType => {
    return {
        type: SHOW_ALERT,
        payload: message
    }
}

const hideAlert = (): hideAlertActionType => {
    return {
        type: HIDE_ALERT,
        payload: ''
    }
}

const postSuccess = (): postSuccessActionType => {
    return {
        type: POST_SUCCESS,
        payload: true
    }
}

const postFailed = (message: string): postFailedActionType => {
    return {
        type: POST_FAILED,
        payload: message
    }
}

const clearUsersAfterPost = (): clearUsersAfterPostActionType => {
    usersResponseStorage.currentUrl = 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6';

    return {
        type: CLEAR_USERS,
        payload: []
    }
}

const showProgressBar = (isShow: boolean): showProgressBarActionType => {
    return {
        type: SHOW_PROGRESS,
        payload: isShow
    }
}

// root action type
export type ActionTypes = showMoreUsersCurrentActionType |
showButtonActionType | 
getPositionsCurrentActionType | 
showAlertCurrentActionType | 
hideAlertActionType |
postSuccessActionType| 
postFailedActionType |
clearUsersAfterPostActionType |
showProgressBarActionType;

// async actions
export const showMoreUsers = (): ThunkAction<Promise<void>, unknown, unknown, ActionTypes> => {
    return async dispatch => {
        try {
            if(usersResponseStorage.currentUrl) {
                const response = await fetch(usersResponseStorage.currentUrl);

                if(response.ok === true) {
                    const json: IResponseShowMoreUsers = await response.json();

                    if(json.success === true) {
                        usersResponseStorage.currentUrl = json.links.next_url;
                        dispatch(showMoreUsersCurrent(json.users));
                        
                        if(json.page === json.total_pages) {
                            dispatch(showButton(false));
                        }
                    } else {
                        throw new Error(`The request was not successful`);
                    }
                } else {
                    throw new Error(`Incorrect response. Response.ok = ${response.ok}`);
                }
            } else {
                dispatch(showButton(false));
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getPositions = (): ThunkAction<Promise<void>, unknown, unknown, ActionTypes> => {
    return async dispatch => {
        try {
            const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions');

            if(response.ok === true) {
                const json: IGetPosition = await response.json();

                if(json.success === true) {
                    dispatch(getPositionsCurrent(json.positions));
                } else {
                    throw new Error(`The request was not successful`);
                }
            } else {
                throw new Error(`Incorrect response. Response.ok = ${response.ok}`)
            } 
        } catch(error) {
            console.log(error.message);
        }
    }
}

export const showAlert = (message: string): ThunkAction<void, unknown, unknown, ActionTypes> => {
    return dispatch => {
        dispatch(showAlertCurrent(message));

        setTimeout(() => {
            dispatch(hideAlert());
        }, 5000);
    }
}

const getToken = async () => {
    try {
        const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token');
        if(response.ok === true) {
            const json: IGetToken = await response.json();
            if(json.success === true) {
                return json.token;
            } else {
                throw new Error(`The request was not successful`);
            }
        } else {
            throw new Error(`Incorrect response. Response.ok = ${response.ok}`);
        }
    } catch(error) {
        console.log(error);

        return false;
    }
}

export const POSTForm = (formData: FormData, clear: IClearForm): ThunkAction<Promise<void>, unknown, unknown, ActionTypes> => {
    return async dispatch => {
        try {
            dispatch(showProgressBar(true));
            const token = await getToken();
            if(token) {
                const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users',
                { method: 'POST', body: formData, headers: { 'Token': token}});

                if(response.ok === true) {
                    const json: any = await response.json();

                    if(json.success === true) {
                        dispatch(postSuccess());
                        clear();
                        dispatch(showProgressBar(false));
                        dispatch(clearUsersAfterPost());
                        dispatch(showButton(true));
                        dispatch(showMoreUsers());
                        console.log('Form submitted successfully');
                    } else {
                        throw new Error(json.message);
                    }
                } else {
                    const json: any = await response.json();

                    throw new Error(json.message);
                }
            } else {
                throw new Error(`Incorrect token, please try again`);
            }
        } catch(error) {
            dispatch(showProgressBar(false));
            dispatch(postFailed(error.message));
            console.log(error.message);
        }
    }
} 
