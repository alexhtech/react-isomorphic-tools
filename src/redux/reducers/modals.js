import {MODALS_OPEN, MODALS_CLOSE, MODALS_CLOSE_ALL} from '../constants'


const modals = (state = {}, action) => {
    switch (action.type) {
        case MODALS_OPEN:
            return {...state, [action.meta]: true}
        case MODALS_CLOSE:
            return {...state, [action.meta]: false}
        case MODALS_CLOSE_ALL:
            return {}
        default:
            return state
    }
}

export {
    modals
}
