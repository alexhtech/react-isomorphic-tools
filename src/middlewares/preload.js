import {LOCATION_CHANGE, push} from 'react-router-redux'
import resolveRoutes from '../lib/resolveRoutes'
import {PRELOAD_START, PRELOAD_SUCCESS, PRELOAD_FAIL} from '../constants'
import {fail} from '../actions/preload'

let lock = true

export default history => store => next => action => { // eslint-disable-line no-unused-vars
    switch (action.type) {

        case PRELOAD_START: {
            lock = true
            next(action)
        }
            break
        case PRELOAD_SUCCESS: {
            next(action)
        }
            break
        case PRELOAD_FAIL: {
            if (action.payload.code == 303) {
                const {to, e, location} = action.payload
                next(action)
                store.dispatch(push(to == '/error' ? {
                    pathname: to, search: '?errorData=' + JSON.stringify({location, e})
                } : to))
            }
        }
            break
        case LOCATION_CHANGE: {
            if (lock) {
                next(action)
                lock = false
            } else {
                resolveRoutes({location: history.location, store}).then(()=> {
                    next(action)
                }).catch((e)=> {
                    store.dispatch(fail(e, history.location))
                })
            }
        }
            break
        default: {
            next(action)
        }

    }
}