import {PRELOAD_START, PRELOAD_SUCCESS, PRELOAD_FAIL} from '../../constants'


const start = () => ({
    type: PRELOAD_START
})


const success = () => ({
    type: PRELOAD_SUCCESS
})

const fail = (e, location) => ({
    type: PRELOAD_FAIL,
    payload: {
        e,
        location
    }
})


export {
    start,
    success,
    fail
}