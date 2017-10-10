import {PRELOAD_START, PRELOAD_SUCCESS, PRELOAD_FAIL} from '../constants'


const start = () => ({
    type: PRELOAD_START
})


const success = () => ({
    type: PRELOAD_SUCCESS
})

const fail = ({code = 303, to = '/error', ...rest}, location) => ({
    type: PRELOAD_FAIL,
    payload: {
        code,
        to,
        location,
        e: rest
    }
})


export {
    start,
    success,
    fail
}