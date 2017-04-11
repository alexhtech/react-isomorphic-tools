import lodash from 'lodash'
import Immutable from 'immutable'
import {start, finish, push} from '../actions/preload'
import {fetcher, fetchToState} from 'react-isomorphic-tools'

const loadData = async({getState, dispatch}, {components, routes, params, location:{query}, location, router, ...props}) => {
    components = getComponents(components).filter((item)=> {
        return item.hasOwnProperty('preload') ? !isLoaded(item, {
            getState,
            params,
            query
        }) : true
    })
    if (components.length) {
            dispatch(start())
            for (let i in components) {
                if (components.hasOwnProperty(i)) {
                    const component = components[i]
                    if (component.hasOwnProperty('onEnter')) {
                        await component.onEnter({
                            getState,
                            dispatch,
                            routes,
                            params,
                            location,
                            router,
                            redirect: (props)=> {
                                throw {
                                    code: 303,
                                    location: props
                                }
                            }
                        }, props)
                    }
                    await component.preload({
                        getState,
                        dispatch,
                        routes,
                        params,
                        location,
                        router,
                        fetcher,
                        fetchToState: (url, params) => dispatch(fetchToState(url, params)),
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
    return components.filter((item)=>typeof item == 'function' && (item.hasOwnProperty('preload') || item.hasOwnProperty('onEnter')))
}

export {loadData, getComponents}