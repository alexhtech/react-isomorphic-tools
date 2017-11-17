import isBrowser from 'is-browser'
import {matchRoutes} from 'react-router-config'
import AbstractResolver from './AbstractResolver'
import FetchToState from '../redux/FetchToState'
import {start, success, fail} from '../redux/actions/preload'


class ReduxResolver extends AbstractResolver {
    init = (routes, store, history, resolved) => {
        if (!resolved) {
            this.routes = routes
            this.store = store
            this.resolved = []
            this.history = history
        } else {
            ReduxResolver.prototype.routes = routes
            ReduxResolver.prototype.store = store
            ReduxResolver.prototype.history = history
            ReduxResolver.prototype.resolved = resolved
        }
    }

    preloadStart = () => {
        const {dispatch} = this.store
        dispatch(start())
    }

    preloadSuccess = () => {
        const {dispatch} = this.store
        dispatch(success())
    }

    preloadFail = (e, location) => {
        const {dispatch} = this.store
        dispatch(fail(e, location))
    }

    resolveData = async (location) => {
        const {getState, dispatch} = this.store
        const {fetchToState, fetcher} = new FetchToState()
        const {pathname, search = ''} = location

        const unResolved = matchRoutes(this.routes, pathname).filter(
            item => typeof item.route.preload === 'function' && !this.isResolved(item, location)
        )

        if (unResolved.length === 0) return;

        this.preloadStart()

        for (const i in unResolved) {
            if (Object.prototype.hasOwnProperty.call(unResolved, i)) {
                const {match: {params}, route: {preload, path}} = unResolved[i]
                await preload({
                    getState,
                    dispatch,
                    params,
                    location: {...location, query: this.parseQuery(search)},
                    fetcher,
                    fetchToState: (...args) => dispatch(fetchToState(...args)),
                    redirect: (props) => {
                        throw {
                            code: 303,
                            to: this.makeLocation(props),
                            type: 'redirect'
                        }
                    }
                })

                this.pushItem({
                    params,
                    path,
                    search,
                    isServer: !isBrowser
                })
            }
        }

        this.preloadSuccess()
    }
}


export {
    ReduxResolver as default
}
