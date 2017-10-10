import Immutable from 'immutable'
import {AUTH_ACCOUNT_SUCCESS, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT_SUCCESS} from '../../constants'

const authentication = (state = Immutable.Map({}), action) => {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
            return state.set('user', Immutable.fromJS(action.payload))
        case AUTH_LOGOUT_SUCCESS:
            return state.set('user', null)
        case AUTH_ACCOUNT_SUCCESS:
            return state.set('user', Immutable.fromJS(action.payload))
        default:
            return state
    }
}

export {authentication}