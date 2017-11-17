import qs from 'qs'
import {select} from 'react-cookie'
import {
    getBaseUrl, isAuthenticated, getToken, getTokenPrefix
} from '../utils/settings'


class Fetcher {
    fetcher = (url, options = {}) => {
        const {
            params,
            queryParams,
            type = 'json',
            baseUrl = getBaseUrl(),
            method = 'get',
            customHeaders = false,
            query,
            body
        } = options

        const args = {
            mode: 'cors',
            credentials: 'same-origin',
            method: method.toUpperCase(),
            headers: new Headers()
        }

        let search = ''
        if (type === 'form-data') {
            args.body = body
            search = this.stringifyQuery(queryParams || query)
        } else if (type === 'json') {
            if (args.method === 'GET') {
                search = this.stringifyQuery(params || query)
                if (body) {
                    console.error('Warning: GET method doesn`t have a request body, you should use `query`')
                }
            } else {
                if (params || body) {
                    args.body = JSON.stringify(params || body)
                }
                if (queryParams || query) {
                    search = this.stringifyQuery(queryParams || query)
                }
            }

            args.headers.set('Accept', 'application/json')
            args.headers.set('Content-Type', 'application/json')
            args.headers.set('cookie', this.getCookiesData())
        } else {
            throw new Error(`Type '${type}' - is not supported in the Fetcher`)
        }


        if (isAuthenticated()) {
            args.headers.set('Authorization', `${getTokenPrefix()}${getToken()}`)
        }

        if (customHeaders) {
            args.headers = customHeaders
        }

        if (params) {
            console.warn('Deprecated: Using `params` is deprecated, you should use `body` for all methods except GET or `query`, instead')
        }

        if (queryParams) {
            console.warn('Deprecated: Using `queryParams` is deprecated, you should use `query` for all methods instead')
        }

        return new Promise((res, rej) => {
            fetch(baseUrl + url + search, args)
                .then(data => {
                    const contentType = data.headers.get('content-type')

                    if (data.status >= 400) {
                        if (contentType.indexOf('application/json') !== -1) {
                            data.json().then(rej)
                        } else {
                            data.text().then(rej)
                        }
                    } else {
                        if (contentType && contentType.indexOf('application/json') !== -1) {
                            data.json().then(res)
                        } else {
                            data.text().then(res)
                        }
                    }
                })
                .catch(rej)
        })
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