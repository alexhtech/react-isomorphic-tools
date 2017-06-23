import cookie from 'react-cookie'
import {NAVIGATOR_SET_LOCALE, NAVIGATOR_SET_USER_AGENT} from '../constants'

const setLocale = (locale) => dispatch => {
    dispatch({
        type: NAVIGATOR_SET_LOCALE,
        payload: locale
    })
    cookie.save('locale', locale)
    typeof (location) == 'object' && location.reload()
}

const setUserAgent = userAgent => dispatch => {
    dispatch({
        type: NAVIGATOR_SET_USER_AGENT,
        payload: userAgent
    })
}

export {
    setLocale,
    setUserAgent
}