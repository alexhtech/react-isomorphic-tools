import isBrowser from 'is-browser'
import {matchRoutes} from 'react-router-config'
import AbstractResolver from './AbstractResolver'
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
        const {pathname, search = ''} = location

        const branch = matchRoutes(this.routes, pathname).filter(item =>
            typeof item.route.preload === 'function' ||
            typeof item.route.onEnter === 'function'
        )

        if (branch.length === 0) return;

        this.preloadStart()

        for (const i in branch) {
            if (Object.prototype.hasOwnProperty.call(branch, i)) {
                const {match: {params}, route: {preload, path, onEnter}} = branch[i]
                const options = {
                    getState,
                    dispatch,
                    params,
                    location: {...location, query: this.parseQuery(search)},
                    redirect: (props) => {
                        throw {
                            code: 303,
                            to: this.makeLocation(props),
                            type: 'redirect'
                        }
                    },
                    ...this.helpers
                }

                onEnter && await onEnter(options)
                preload && !this.isResolved(branch[i], location) && await preload(options)

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
