import Immutable from 'immutable'

const ImmutableAuthentication = (state = Immutable.Map({}), action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return state.set('user', Immutable.fromJS(action.payload))
        case 'LOGOUT_SUCCESS':
            return state.set('user', null)
        case 'ACCOUNT_SUCCESS':
            return state.set('user', Immutable.fromJS(action.payload))
        default:
            return state
    }
}

export {ImmutableAuthentication}