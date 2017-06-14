import cookie from 'react-cookie'

const setLocale = (locale) => dispatch => {
    dispatch({
        type: 'navigator/SET_LOCALE',
        payload: locale
    })
    cookie.save('locale', locale)
    typeof (location) == 'object' && location.reload()
}

const setUserAgent = userAgent => dispatch => {
    dispatch({
        type: 'navigator/SET_USER_AGENT',
        payload: userAgent
    })
}

const setHost = host => dispatch => {
    dispatch({
        type: 'navigator/SET_HOST',
        payload: host
    })
}

export {
    setLocale,
    setUserAgent,
    setHost
}