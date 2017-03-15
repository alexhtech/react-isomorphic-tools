import lodash from 'lodash'
import Immutable from 'immutable'
import {start, finish, error, push} from '../actions/preload'
import {fetcher, fetchToState} from 'react-isomorphic-tools'

const loadData = async({getState, dispatch}, {components, routes, params, location:{query}, location, router, ...props}) => {
    components = getComponents(components).filter((item)=> {
        return !isLoaded(item, {
            getState,
            params,
            query
        })
    })
    if (components.length) {
        try {
            dispatch(start())
            for (let i in components) {
                if (components.hasOwnProperty(i)) {
                    const component = components[i]
                    await component.preload({
                        getState,
                        dispatch,
                        routes,
                        params,
                        location,
                        router,
                        fetcher,
                        fetchToState: (url, params) => dispatch(fetchToState(url, params))
                    }, props)
                    dispatch(push({
                        displayName: component.displayName,
                        params,
                        query
                    }))
                }
            }
            dispatch(finish())
        }
        catch (e) {
            dispatch(error(e))
        }
    }
}


const isLoaded = ({displayName, preloadOptions}, {getState, params, query}) => {
    const state = getState()
    const {preload} = Immutable.Map.isMap(state) ? state.toJS() : state
    const {alwaysReload = false, reloadOnQueryChange = true, reloadOnParamsChange = true} = preloadOptions

    return preload.components.findIndex((item)=> {
            if (item.name == displayName) {
                if (alwaysReload) return false
                return (reloadOnParamsChange ? lodash.isEqual(item.params, params) : true) && (reloadOnQueryChange ? lodash.isEqual(query, item.query) : true)
            }
        }) != -1
}

const getComponents = (components) => {
    return components.filter((item)=>typeof item == 'function' && item.hasOwnProperty('preload') && typeof item.preload == 'function')
}

export {loadData, getComponents}