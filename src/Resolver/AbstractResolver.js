import isBrowser from 'is-browser'
import {matchRoutes} from 'react-router-config'
import shallowEqual from 'shallowequal'
import qs from 'qs'


class AbstractResolver {
    constructor({helpers = {}, routes, resolved = [], history}) {
        this.helpers = helpers
        this.routes = routes
        this.resolved = resolved
        this.history = history
        this.listeners = []
        this.injectListener(history)
    }

    getRoutes = () => this.routes

    getResolved = () => this.resolved

    setHelpers = (helpers) => {
        this.helpers = helpers
    }

    addHelper = (key, helper) => {
        this.helpers[key] = helper
    }

    notifyListeners = async (...args) => {
        try {
            await this.resolve(args[0])
            this.listeners.forEach(listener => listener(...args))
        } catch (e) {
            if (e.code === 303) {
                this.preloadFail(e, location)
                this.history.replace(e.to)
            } else {
                this.preloadFail(e, location)
                this.history.goBack()
            }
        }
    }

    injectListener = ({listen}) => {
        listen(this.notifyListeners)
        this.history.listen = (listener) => {
            this.listeners.push(listener)
            return () => {
                this.listeners = this.listeners.filter(item => item !== listener)
            }
        }
    }

    injectOptionsFromComponent = (item) => {
        const {preload, onEnter, routes, preloadOptions} = item.route.component

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
                this.injectOptionsFromComponent(item)
            }
        })
        const components = await Promise.all(matched.map(item => item.route.getComponent()))
        components.forEach((item, index) => {
            matched[index].route.component = item.default
            this.injectOptionsFromComponent(item)
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
}


export {
    AbstractResolver as default
}
