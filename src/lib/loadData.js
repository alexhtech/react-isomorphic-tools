import lodash from 'lodash'
import isBrowser from 'is-browser'
import {parse} from 'qs'
import {fetcher, fetchToState} from './'
import {start, success} from '../actions/preload'


let resolved = isBrowser ? window.__REACT_ISOMORPHIC_TOOLS_RESOLVED_ROUTES : []


const loadData = async({foundRoutes, store, location}) => {
    if (!isBrowser) resolved = [] // always clear resolved array on the server
    const {getState, dispatch} = store
    let started = false
    for (let i in foundRoutes) {
        if (foundRoutes.hasOwnProperty(i)) {
            const {match:{params, path}, route:{component, routes, preload, preloadOptions = {}, ...props}} = foundRoutes[i] // eslint-disable-line
            if (typeof preload == 'function') {
                if (isResolved(path, location.search, params, preloadOptions)) {
                    if (!started) {
                        started = true;
                        dispatch(start())
                    }
                    await preload({
                        getState,
                        dispatch,
                        params,
                        location: {...location, query: parse(location.search)},
                        fetcher,
                        fetchToState: (url, params)=>dispatch(fetchToState(url, params)),
                        redirect: (props)=> {
                            throw {
                                code: 303,
                                to: props,
                                type: 'redirect'
                            }
                        }
                    }, props)
                    push({
                        path: path,
                        params,
                        search: location.search,
                        isServer: !isBrowser
                    })
                }
            }
        }
    }
    started && dispatch(success())
}

const isResolved = (path, search, params, preloadOptions) => {
    const {alwaysReload = false, reloadOnQueryChange = true, reloadOnParamsChange = true} = preloadOptions

    return resolved.findIndex((item, index)=> {
            if (item.path == path) {
                if (item.isServer) {
                    if (isBrowser) {
                        resolved[index].isServer = false
                    }
                    return true
                }
                if (alwaysReload) return false
                return (reloadOnParamsChange ? lodash.isEqual(item.params, params) : true) && (reloadOnQueryChange ? search == item.search : true)
            }
        }) == -1
}

const push = (item) => {
    const index = resolved.findIndex((i)=>i.path == item.path)
    if (index != -1) {
        //update
        resolved[index] = item
    } else {
        //push
        resolved.push(item)
    }
}

export {
    loadData as default,
    resolved
}
