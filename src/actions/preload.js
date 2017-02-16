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

const error = (e) => dispatch => {
    dispatch({
        type: '@@preload/error',
        payload: e
    })
}

export {push, start, finish, error}