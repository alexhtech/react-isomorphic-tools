import { browserHistory } from 'react-router'

const redirect = store => next => action => {
    if (action.type === '@@router/routing') {
        browserHistory[action.payload.method](action.payload.nextUrl)
    }

    return next(action)
}

export {redirect}