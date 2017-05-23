import Immutable from 'immutable'

const ImmutableNavigator = (state = Immutable.Map({}), action) =>{
    switch (action.type){
        case 'navigator/SET_USER_AGENT':
            return state.set('userAgent', action.payload)
        case 'navigator/SET_LOCALE':
            return state.set('locale', action.payload)
        default:
            return state
    }
}

export {
    ImmutableNavigator
}