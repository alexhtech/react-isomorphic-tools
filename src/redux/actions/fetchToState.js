import {
    FETCH_TO_STATE_REQUEST,
    FETCH_TO_STATE_SUCCESS,
    FETCH_TO_STATE_FAIL
} from '../constants'


const request = ({key, request}) => dispatch =>
    dispatch({
        type: FETCH_TO_STATE_REQUEST,
        meta: {
            key
        },
        payload: {
            response: null,
            request
        }
    })


const success = ({key, response, request}) => dispatch =>
    dispatch({
        type: FETCH_TO_STATE_SUCCESS,
        meta: {
            key
        },
        payload: {
            response,
            request
        }
    })


const fail = ({key, e}) => dispatch =>
    dispatch({
        type: FETCH_TO_STATE_FAIL,
        meta: {
            key
        },
        payload: {
            error: e
        }
    })


export {
    request,
    success,
    fail
}