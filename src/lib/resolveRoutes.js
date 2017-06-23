import {matchRoutes} from 'react-router-config'
import loadData from './loadData'

let resolvedRoutes = []


const resolveRoutes = async({routes, location, store}) => {
    if (routes) resolvedRoutes = routes

    const foundRoutes = matchRoutes(routes || resolvedRoutes, location.pathname)
    for (let i in foundRoutes) {
        if (foundRoutes.hasOwnProperty(i)) {
            const route = foundRoutes[i]
            if (!route.route.component && typeof route.route.getComponent == 'function') {
                route.route.component = (await route.route.getComponent()).default
            }
        }
    }

    await loadData({foundRoutes, location, store})

    return resolvedRoutes
}


export default resolveRoutes