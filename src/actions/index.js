const goto = (url) => dispatch => {
    dispatch({
        type: '@@router/routing',
        payload:{
            method: 'push',
            nextUrl: url
        }
    })
}

const replace = (url) => dispatch => {
    dispatch({
        type: '@@router/routing',
        payload:{
            method: 'replace',
            nextUrl: url
        }
    })
}

export {goto, replace}