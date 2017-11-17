import ReduxResolver from './Resolver/ReduxResolver'
import Resolver from './Resolver/Provider'
import page from './server/page'
import Link from './Link'
import NavLink from './NavLink'
import {
    isAuthenticated,
    logout,
    setToken,
    getToken,
    setRefreshToken,
    getRefreshToken,
    setTokenName,
    setRefreshTokenName,
    setTokenPrefix,
    getTokenPrefix,
    setBaseUrl,
    getBaseUrl,
} from './utils/settings'

import {
    getCookiesData,
    stringifyQuery,
    parseQuery,
    fetcher
} from './utils/fetcher'


import {fetchToState} from './redux'


export {default as preload} from './Resolver/preload'
export {default as onEnter} from './Resolver/onEnter'
export {default as Fetcher} from './Data/Fetcher'
export {default as FetchToState} from './redux/FetchToState'

export {
    ReduxResolver,
    Resolver,
    fetchToState,
    page,
    Link,
    NavLink,
    isAuthenticated,
    logout,
    setToken,
    getToken,
    setRefreshToken,
    getRefreshToken,
    setTokenName,
    setRefreshTokenName,
    setTokenPrefix,
    getTokenPrefix,
    setBaseUrl,
    getBaseUrl,
    getCookiesData,
    stringifyQuery,
    parseQuery,
    fetcher
}
