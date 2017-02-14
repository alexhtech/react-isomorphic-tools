import lodash from 'lodash'
import Immutable from 'immutable'
import {start, finish, error, push} from '../actions/preload'
import {fetcher, fetchToState} from '../lib/Fetcher'

const loadData = async({getState, dispatch}, {components, routes, params, location, router, ...props}) => {
    components = getComponents(components).filter((item)=> {
        return !isLoaded(item.displayName, {
            getState,
            params,
            location
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
                        location
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


const isLoaded = (displayName, {getState, params, location}) => {
    const state = getState()
    const {preload} = Immutable.Map.isMap(state) ? state.toJS() : state

    return preload.components.findIndex((item)=> {
            if (item.name == displayName) {
                return lodash.isEqual(item.params, params) && lodash.isEqual(location.query, item.location.query)
            }
        }) != -1
}

const getComponents = (components) => {
    return components.filter((item)=>typeof item == 'function' && item.hasOwnProperty('preload') && typeof item.preload == 'function')
}

export {loadData, getComponents}