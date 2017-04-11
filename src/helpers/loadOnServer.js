import {push, start, finish, error} from '../actions/preload'
import {getComponents} from '../helpers/preload'
import {fetcher, fetchToState} from 'react-isomorphic-tools'


let initPreload

export default async({store:{getState, dispatch}, renderProps})=> {
    if (!renderProps) return;
    let {components, routes, params, location, router, ...props} = renderProps
    components = getComponents(components)
    if (initPreload && typeof (initPreload) == 'function') components.unshift({
        preload: initPreload
    })
    if (components.length) {
        dispatch(start())
        for (let i in components) {
            if (components.hasOwnProperty(i)) {
                const component = components[i]
                if(component.hasOwnProperty('onEnter')){
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
}

function setInitPreload(preload) {
    initPreload = preload
}

export {setInitPreload}