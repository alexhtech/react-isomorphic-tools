import 'isomorphic-fetch'
import 'es6-promise'
import qs from 'qs'
import {select} from 'react-cookie'
import {
    getBaseUrl, isAuthenticated, getToken, getTokenPrefix
} from '../'


class Fetcher {
    fetcher = async (url, options = {}) => {
        const {
            params = {},
            queryParams = {},
            type = 'json',
            baseUrl = getBaseUrl(),
            method = 'GET',
            customHeaders = false
        } = options

        const args = {
            mode: 'cors',
            credentials: 'same-origin'
        }

        let query = ''

        switch (type) {
            case 'form-data':
                args.body = params
                query = this.stringifyQuery(queryParams)
                break;
            case 'json':
                args.body = JSON.stringify(params)
                query = this.stringifyQuery(queryParams)
                args.headers = new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    cookie: this.getCookiesData()
                })
                break;
            default:
                throw new Error({
                    error: `Type '${type}' - is not supported in Fetcher`
                })
        }

        if (isAuthenticated()) {
            args.headers.set('Authorization', getTokenPrefix() + getToken())
        }

        if (customHeaders) {
            args.headers = customHeaders
        }

        try {
            const data = await fetch(baseUrl + url + query, args)

            const contentType = data.headers.get('content-type')

            if (contentType && contentType.indexOf('application/json') !== -1) {
                return await data.json()
            }

            return await data.text()
        } catch (e) {
            throw new Error({
                type: 'notAvailableResource',
                params: {
                    method,
                    baseUrl,
                    url,
                    params
                },
                e
            })
        }
    }

    stringifyQuery = params => qs.stringify(params, {addQueryPrefix: true}) || ''

    parseQuery = queryString => qs.parse(queryString, {ignoreQueryPrefix: true})

    getCookiesData = () => {
        const cookies = select()
        let string = ''

        for (const i in cookies) {
            if (Object.prototype.hasOwnProperty.call(cookies, i)) {
                string += `${i}=${cookies[i]}; `
            }
        }

        return string
    }
}


export {
    Fetcher as default
}