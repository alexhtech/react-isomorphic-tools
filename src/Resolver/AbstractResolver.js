import isBrowser from 'is-browser'
import {matchRoutes} from 'react-router-config'
import shallowEqual from 'shallowequal'
import qs from 'qs'


class AbstractResolver {
    getRoutes = () => this.routes

    getResolved = () => this.resolved

    initHelpers = (item) => {
        const {preload, onEnter, routes} = item.route.component
        if (typeof (preload) === 'function' && item.route.preload !== preload) {
            item.route.preload = preload
        }
        if (typeof (preloadOptions) === 'object' && item.route.preloadOptions !== preloadOptions) {
            item.route.preloadOptions = preloadOptions
        }
        if (typeof (onEnter) === 'function' && item.route.onEnter !== onEnter) {
            item.route.onEnter = onEnter
        }
        if (typeof routes === 'object' && item.route.routes !== routes) {
            item.route.routes = routes
        }
    }

    resolveChunks = async (location) => {
        const matched = []
        const {pathname} = location
        matchRoutes(this.routes, pathname).forEach((item) => {
            if (!item.route.component && typeof item.route.getComponent === 'function') {
                matched.push(item)
            } else {
                this.initHelpers(item)
            }
        })
        const components = await Promise.all(matched.map(item => item.route.getComponent()))
        components.forEach((item, index) => {
            matched[index].route.component = item.default
            this.initHelpers(item)
        })
    }


    isResolved = ({match: {params, path}, route: {preloadOptions = {}}}, {search = ''}) => {
        const {
            alwaysReload = false,
            reloadOnQueryChange = true,
            reloadOnParamsChange = true
        } = preloadOptions


        return this.resolved.findIndex((item) => {
            if (item.path === path) {
                if (item.isServer) {
                    if (isBrowser) {
                        item.isServer = undefined
                    }

                    return true
                }

                if (alwaysReload) return false
                return (reloadOnParamsChange ? shallowEqual(item.params, params) : true) &&
                    (reloadOnQueryChange ? search === item.search : true)
            }

            return false
        }) !== -1
    }

    pushItem = (item) => {
        const index = this.resolved.findIndex(i => i.path === item.path)
        if (index !== -1) {
            this.resolved[index] = item
        } else {
            this.resolved.push(item)
        }
    }

    resolve = (location) => Promise.all([this.resolveChunks(location), this.resolveData(location)])


    makeLocation = (to) => {
        if (typeof to === 'string') {
            return {
                pathname: to
            }
        } else {
            return to
        }
    }

    stringifyQuery = params => qs.stringify(params, {addQueryPrefix: true}) || ''

    parseQuery = queryString => qs.parse(queryString, {ignoreQueryPrefix: true})

    lock = () => {
        AbstractResolver.prototype.locked = true
    }

    unLock = () => {
        AbstractResolver.prototype.locked = false
    }

    isLock = () => AbstractResolver.prototype.locked

    getManager = (type) => async to => {
        if (this.isLock()) {
            return
        }
        const location = this.makeLocation(to)
        try {
            this.lock()
            await this.resolve(location)
            this.history[type](location)
        } catch (e) {
            if (e.code === 303) {
                this.unLock()
                this.preloadSuccess()
                this[type](e.to)
            } else {
                this.unLock()
                this.preloadFail(e, location)
                throw e
            }
        }
    }

    push = this.getManager('push')

    replace = this.getManager('replace')
}


export {
    AbstractResolver as default
}
