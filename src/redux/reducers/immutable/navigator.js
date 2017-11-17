import Immutable from 'immutable'
import {NAVIGATOR_SET_LOCALE, NAVIGATOR_SET_USER_AGENT} from '../../../constants'

const navigator = (state = Immutable.Map({}), action) => {
    switch (action.type) {
        case NAVIGATOR_SET_USER_AGENT:
            return state.set('userAgent', action.payload)
        case NAVIGATOR_SET_LOCALE:
            return state.set('locale', action.payload)
        default:
            return state
    }
}

export {
    navigator
}