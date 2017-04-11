import {replace} from "react-router-redux"

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
                store.dispatch(replace(action.payload.location))
                next(action)
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