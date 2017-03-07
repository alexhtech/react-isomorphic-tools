import {push, start, finish, error} from '../actions/preload'
import {getComponents} from '../helpers/preload'
import {fetcher, fetchToState} from 'react-isomorphic-tools'


let initPreload

export default async({store:{getState, dispatch}, renderProps})=> {
    if (!renderProps) return;
    let {components, routes, params, location, router, ...props} = renderProps
    components = getComponents(components)
    if(initPreload && typeof (initPreload) == 'function' && typeof (initPreload.then) == 'function') components.unshift(initPreload)
    if (components.length) {
        try {
            dispatch(start())
            for (let i in components) {
                if (components.hasOwnProperty(i)) {
                    await components[i].preload({
                        getState,
                        dispatch,
                        routes,
                        params,
                        location,
                        router,
                        fetcher,
                        fetchToState: (url, params)=>dispatch(fetchToState(url, params))
                    }, props)
                    dispatch(push({
                        displayName: components[i].displayName,
                        params,
                        query: location.query
                    }))
                }
            }
            dispatch(finish())
        }
        catch (e) {
            console.log('error', e)
            dispatch(error(e))
        }
    }
}

function setInitPreload(preload) {
    initPreload = preload
}

export {setInitPreload}