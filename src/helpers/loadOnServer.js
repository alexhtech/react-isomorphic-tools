import {push, start, finish, error} from '../actions/preload'
import {getComponents} from '../helpers/preload'
import {fetcher, fetchToState, setBaseUrl} from '../lib/Fetcher'


export default async({store:{getState, dispatch}, renderProps, baseUrl})=> {
    setBaseUrl(baseUrl)
    if(!renderProps) return;
    let {components, routes, params, location, router, ...props} = renderProps
    components = getComponents(components)
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
            dispatch(error(e))
        }
    }
}