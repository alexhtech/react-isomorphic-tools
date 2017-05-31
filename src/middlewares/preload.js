import {replace} from 'react-router-redux'

let lock = false
export default store => next => action => {
    switch (action.type) {
        case '@@preload/start': {
            lock = true
            next(action)
        }
            break
        case '@@preload/finish': {
            lock = false
            next(action)
        }
            break
        case '@@preload/error': {
            lock = false
            if (action.payload.code == 303) {
                const {to, e, location} = action.payload
                next(action)
                store.dispatch(replace(to == '/error' ? {
                    pathname: to, query: {
                        errorData: JSON.stringify({
                            location,
                            e
                        })
                    }
                } : to))
            }
        }
            break
        case '@@router/LOCATION_CHANGE': {
            if (!lock) {
                next(action)
            }
        }
            break
        default: {
            next(action)
        }

    }
}