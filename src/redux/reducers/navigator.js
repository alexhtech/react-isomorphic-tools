import {NAVIGATOR_SET_LOCALE, NAVIGATOR_SET_USER_AGENT} from '../../constants'


const navigator = (state = {}, action) => {
    switch (action.type) {
        case NAVIGATOR_SET_USER_AGENT:
            return {...state, userAgent: action.payload}
        case NAVIGATOR_SET_LOCALE:
            return {...state, locale: action.payload}
        default:
            return state
    }
}

export {
    navigator
}