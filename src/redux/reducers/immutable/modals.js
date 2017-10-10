import Immutable from 'immutable'
import {MODALS_OPEN, MODALS_CLOSE, MODALS_CLOSE_ALL} from '../../constants'

const modals = (state = Immutable.Map({}), action)=> {
    switch (action.type) {
        case MODALS_OPEN:
            return state.set(action.meta, true)
        case MODALS_CLOSE:
            return state.set(action.meta, false)
        case MODALS_CLOSE_ALL:
            return Immutable.Map({})
        default:
            return state
    }
}

export {modals}
