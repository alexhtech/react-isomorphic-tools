import isBrowser from 'is-browser'
import {matchRoutes} from 'react-router-config'
import AbstractResolver from './AbstractResolver'
import FetchToState from '../redux/FetchToState'
import {start, success} from '../redux/actions/preload'
import {parseQuery} from '../'


class ReduxResolver extends AbstractResolver {
    constructor(routes, store, resolved = []) {
        super(routes, resolved);
        this.store = store
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
                    location: {...location, query: parseQuery(search)},
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

                this.push({
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
