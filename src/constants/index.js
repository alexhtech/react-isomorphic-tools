//Fetcher

export const FETCH_TO_STATE_REQUEST = '@@fetchToState/request'
export const FETCH_TO_STATE_SUCCESS = '@@fetchToState/success'
export const FETCH_TO_STATE_FAIL = '@@fetchToState/fail'
export const FETCH_TO_STATE_CLEAR = '@@fetchToState/clear'

//Preload

export const PRELOAD_START = '@@preload/start'
export const PRELOAD_SUCCESS = '@@preload/success'
export const PRELOAD_FAIL = '@@preload/fail'

//modals

export const MODALS_OPEN = '@@modals/open'
export const MODALS_CLOSE = '@@modals/close'
export const MODALS_CLOSE_ALL = '@@modals/closeAll'

// navigator

export const NAVIGATOR_SET_LOCALE = '@@navigator/setLocale'
export const NAVIGATOR_SET_USER_AGENT = '@@navigator/setUserAgent'

// Auth

export const AUTH_LOGIN_SUCCESS = '@@authentication/loginSuccess'
export const AUTH_LOGOUT_SUCCESS = '@@authentication/logoutSuccess'
export const AUTH_ACCOUNT_SUCCESS = '@@authentication/accountSuccess'