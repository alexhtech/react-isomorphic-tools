import {push, start, finish} from '../actions/preload'
import {getComponents} from '../helpers/preload'
import {fetcher, fetchToState} from '../lib/Fetcher'


let initPreload

export default async({store:{getState, dispatch}, renderProps})=> {
    if (!renderProps) return;
    let {components, routes, params, location, router, ...props} = renderProps
    components = getComponents(components)
    if (initPreload && typeof (initPreload) == 'function') components.unshift({
        preload: initPreload
    })
    if (components.length) {
        try {
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
                                    to: props
                                }
                            }
                        }, props)
                    }
                    if (component.hasOwnProperty('preload')) {
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
                    }
                    dispatch(push({
                        displayName: components[i].displayName,
                        params,
                        query: location.query
                    }))
                }
            }
            dispatch(finish())
        }
        catch ({code = 303, to = '/error', ...rest}) {
            throw {
                code,
                to,
                location,
                e: rest
            }
        }
    }
}

function setInitPreload(preload) {
    initPreload = preload
}

export {setInitPreload}