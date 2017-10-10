import Settings from './Settings'
import Fetcher from './Data/Fetcher'


import ReduxResolver from './Resolver/ReduxResolver'


export {ReduxResolver}
import Resolver from './Resolver/Provider'


export {Resolver}
import {fetchToState} from './redux'


export {fetchToState}
import page from './server/page'


export {page}

export const {
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
  getBaseUrl
} = new Settings()
export const {
  getCookiesData,
  stringifyQuery,
  parseQuery,
  fetcher
} = new Fetcher()