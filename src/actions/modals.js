import {MODALS_OPEN, MODALS_CLOSE, MODALS_CLOSE_ALL} from '../constants'

const open = (name) => dispatch => {
    dispatch({
        type: MODALS_OPEN,
        meta: name
    })
}

const close = (name) => dispatch => {
    dispatch({
        type: MODALS_CLOSE,
        meta: name
    })
}

const closeAll = () => dispatch => {
    dispatch({
        type: MODALS_CLOSE_ALL
    })
}

export {
    open,
    close,
    closeAll
}
