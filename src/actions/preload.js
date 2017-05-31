const push = ({displayName, params, query}) => dispatch => {
    dispatch({
        type: '@@preload/push',
        meta: {
            name: displayName,
            params,
            query
        }
    })
}

const start = () => dispatch => {
    dispatch({
        type: '@@preload/start'
    })
}

const finish = () => dispatch => {
    dispatch({
        type: '@@preload/finish'
    })
}

const error = ({code = 303, to = '/error', ...rest}, location) => dispatch => {
    dispatch({
        type: '@@preload/error',
        payload: {
            code,
            to,
            location,
            e: rest
        }
    })
}

export {
    push,
    start,
    finish,
    error
}