import {
    FETCH_TO_STATE_REQUEST,
    FETCH_TO_STATE_SUCCESS,
    FETCH_TO_STATE_FAIL
} from '../constants'

const pushToState = (payload, keys) => dispatch => {
    dispatch({
        type: '@FETCH_DATA/PUSH',
        payload,
        meta: {
            keys
        }
    })
}

const request = ({key, request}) => dispatch => {
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
}

const success = ({key, response}) => dispatch => {
    dispatch({
        type: FETCH_TO_STATE_SUCCESS,
        meta: {
            key
        },
        payload: {
            response
        }
    })
}

const fail = ({key, e}) => dispatch => {
    dispatch({
        type: FETCH_TO_STATE_FAIL,
        meta: {
            key
        },
        payload: {
            error: e
        }
    })
}

export {
    pushToState,
    request,
    success,
    fail
}