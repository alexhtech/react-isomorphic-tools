import {
    FETCH_TO_STATE_REQUEST,
    FETCH_TO_STATE_SUCCESS,
    FETCH_TO_STATE_FAIL,
    FETCH_TO_STATE_CLEAR
} from '../constants'


const fetchData = (state = {}, action) => {
    switch (action.type) {
        case FETCH_TO_STATE_REQUEST:
            return {
                ...state,
                [action.meta.key]: {
                    ...state[action.meta.key],
                    _request: action.payload.request,
                    isFetching: true,
                    isFetched: false,
                    error: false
                }
            }
        case FETCH_TO_STATE_SUCCESS:
            return {
                ...state,
                [action.meta.key]: {
                    ...action.payload,
                    isFetched: true,
                    isFetching: false,
                    error: false,
                }
            }
        case FETCH_TO_STATE_FAIL:
            return {
                ...state,
                [action.meta.key]: {
                    ...state[action.meta.key],
                    error: action.payload.error,
                    isFetching: false,
                    isFetched: false,
                }
            }

        case FETCH_TO_STATE_CLEAR: {
            const {meta} = action
            if (Array.isArray(meta)) {
                return {
                    ...state,
                    ...meta.reduce((acc, cur) => {
                        acc[cur] = undefined;
                        return acc;
                    }, {})
                }
            }

            return {...state, [meta]: undefined}
        }

        default:
            return state
    }
}

export {
    fetchData
}
