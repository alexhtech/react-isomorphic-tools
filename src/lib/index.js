import AuthClass from './AuthClass'
import FetcherClass from './Fetcher/FetcherClass'
import FetchToStateClass from './Fetcher/FetchToStateClass'
import resolveRoutes from './resolveRoutes'
import Link from './Link'
import {open, close, closeAll} from '../actions/modals'
import {setLocale, setUserAgent} from '../actions/navigator'
import errorHandler from './errorHandler'

const Auth = new AuthClass()
const Fetcher = new FetcherClass(Auth)
const FetchToState = new FetchToStateClass(Fetcher)

const {fetcher, setBaseUrl} = Fetcher
const {fetchToState} = FetchToState


export {
    Auth,
    fetchToState,
    fetcher,
    setBaseUrl,
    resolveRoutes,
    Link,
    open as openModal,
    close as closeModal,
    closeAll as closeAllModals,
    setLocale,
    setUserAgent,
    errorHandler
}
