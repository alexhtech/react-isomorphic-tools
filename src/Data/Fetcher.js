import 'isomorphic-fetch'
import 'es6-promise'
import qs from 'qs'
import {select} from 'react-cookie'
import {
    getBaseUrl, isAuthenticated, getToken, getTokenPrefix
} from '../utils/settings'


class Fetcher {
    fetcher = (url, options = {}) => {
        const {
            params = {},
            queryParams = {},
            type = 'json',
            baseUrl = getBaseUrl(),
            method = 'get',
            customHeaders = false
        } = options

        const args = {
            mode: 'cors',
            credentials: 'same-origin',
            method: method.toUpperCase()
        }

        let query = ''
        if (type === 'form-data') {
            args.body = params
            query = this.stringifyQuery(queryParams)
        } else if (type === 'json') {
            if (args.method === 'GET' || args.method === 'DELETE') {
                query = this.stringifyQuery(params)
            } else {
                args.body = JSON.stringify(params)
                query = this.stringifyQuery(queryParams)
            }
            args.headers = new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
                cookie: this.getCookiesData()
            })
        } else {
            throw new Error(`Type '${type}' - is not supported in the Fetcher`)
        }


        if (isAuthenticated()) {
            args.headers.set('Authorization', getTokenPrefix() + getToken())
        }

        if (customHeaders) {
            args.headers = customHeaders
        }

        return new Promise((res, rej) => {
            fetch(baseUrl + url + query, args)
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