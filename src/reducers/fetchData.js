import Immutable from 'immutable'

const fetchData = (state = {}, action) => {
    switch (action.type) {
        case '@FETCH_DATA/REQUEST':
            return {
                ...state, [action.meta.key]: {
                    ...state[action.meta.key],
                    _request: action.payload.request,
                    isFetching: true,
                    isFetched: false,
                    error: false
                }
            }
        case '@FETCH_DATA/SUCCESS':
            return {
                ...state, [action.meta.key]: {
                    ...action.payload,
                    isFetched: true,
                    isFetching: false,
                    error: false,
                    _request: undefined
                }
            }
        case '@FETCH_DATA/ERROR':
            return {
                ...state, [action.meta.key]: {
                    ...state[action.meta.key],
                    error: action.payload.error,
                    isFetching: false,
                    isFetched: false,
                }
            }
        default:
            return state
    }
}

const ImmutableFetchData = (state = Immutable.fromJS({}), action) => {
    switch (action.type) {
        case '@FETCH_DATA/REQUEST':
            return state.mergeIn([action.meta.key], Immutable.fromJS({
                _request: action.payload.request,
                isFetching: true,
                isFetched: false,
                error: false
            }))

        case '@FETCH_DATA/SUCCESS':
            return state.set(action.meta.key, Immutable.fromJS({
                ...action.payload,
                isFetched: true,
                isFetching: false,
                error: false,
            }))

        case '@FETCH_DATA/ERROR':
            return state.set(action.meta.key, {
                error: action.payload.error,
                isFetching: false,
                isFetched: false,
            })

        case '@FETCH_DATA/PUSH':
            return state.setIn(action.meta.keys, state.getIn(action.meta.keys).push(...Immutable.fromJS(action.payload)))

        default:
            return state
    }
}

export {fetchData, ImmutableFetchData}