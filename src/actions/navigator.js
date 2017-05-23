const setLocale = (locale) => dispatch => {
    dispatch({
        type: 'navigator/SET_LOCALE',
        payload: locale
    })
}

const setUserAgent = userAgent => dispatch => {
    dispatch({
        type: 'navigator/SET_USER_AGENT',
        payload: userAgent
    })
}

export {
    setLocale,
    setUserAgent
}