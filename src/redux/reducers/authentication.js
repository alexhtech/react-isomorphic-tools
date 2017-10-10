import {AUTH_ACCOUNT_SUCCESS, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT_SUCCESS} from '../constants'


const authentication = (state = {}, action) => {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
            return {...state, user: action.payload}
        case AUTH_LOGOUT_SUCCESS:
            return {...state, user: null}
        case AUTH_ACCOUNT_SUCCESS:
            return {...state, user: action.payload}
        default:
            return state
    }
}

export {authentication}