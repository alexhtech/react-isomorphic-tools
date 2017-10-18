import isBrowser from 'is-browser'
import {matchRoutes} from 'react-router-config'
import {push, replace} from 'react-router-redux'
import AbstractResolver from './AbstractResolver'
import FetchToState from '../redux/FetchToState'
import {start, success} from '../redux/actions/preload'


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

    resolveData = async (location) => {
        const {getState, dispatch} = this.store
        const {fetchToState, fetcher} = new FetchToState()
        const {pathname, search = ''} = location

        const unResolved = matchRoutes(this.routes, pathname).filter(
            item => typeof item.route.preload === 'function' && !this.isResolved(item, location)
        )

        if (unResolved.length === 0) return;

        dispatch(start())

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
                            to: props,
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

        dispatch(success())
    }
}


export {
    ReduxResolver as default
}
