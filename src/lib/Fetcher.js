import {getTokenPrefix, isAuthenticated, getToken, getRefreshToken, logout, setToken, setRefreshToken} from './Auth'
import 'isomorphic-fetch'
import 'es6-promise'

let BaseUrl

const fetcher = async(url, {params, type = null, baseUrl = BaseUrl, method = 'GET'} = {}) => {
    let headers_data = {}
    let body = {}

    const normalizeParams = (data) => {
        if (typeof (data) == 'object' && (method == 'GET' || method == 'DELETE')) return JSON.stringify(data)
        return data
    }

    if (method == 'GET' || method == 'DELETE') {
        let i = 0
        let query = ''
        for (let name in params) {
            if (params.hasOwnProperty(name)) {
                if (typeof (params[name]) == 'object') {
                    const values = params[name]
                    if (Array.isArray(values)) {
                        for (let value in values) {
                            if (values.hasOwnProperty(value)) {
                                query += `${i > 0 ? '&' : '?'}${name}=${normalizeParams(values[value])}`
                                i++
                            }
                        }
                    } else {
                        query += `${i > 0 ? '&' : '?'}${name}=${normalizeParams(values)}`
                        i++
                    }


                }
                if ((typeof (params[name] == 'number' || typeof (params[name]) == 'string')) && params[name] != undefined) {
                    query += `${i > 0 ? '&' : '?'}${name}=${params[name]}`
                    i++
                }
            }
        }
        url += query
        params = undefined
    }

    switch (type) {
        case 'form-data':
            body = params
            break
        default:
            headers_data = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            body = JSON.stringify(params)
    }

    const headers = new Headers(headers_data)

    if (isAuthenticated()) {
        headers.append('Authorization', `${getTokenPrefix()}${getToken()}`)
    }

    try {
        const data = await fetch(`${baseUrl}${url}`, {method: method, headers: headers, body: body, mode: 'cors'})
        if (data.status >= 400) {
            let error
            if (data.headers.get('content-type').indexOf((item)=>item == 'application/json') != -1) {
                error = await data.json()
            } else {
                error = await data.text()
            }
            if (data.status == 401 && isAuthenticated()) {
                const refreshToken = getRefreshToken()
                if (refreshToken) {
                    const refresh = await fetch(`${baseUrl}/token/refresh`, {
                        method: 'POST',
                        body: JSON.stringify({refreshToken: refreshToken})
                    })
                    const response = await refresh.json()
                    const {token, refreshToken} = response
                    if (refresh.status == 401) {
                        logout()
                        headers.delete('Authorization')
                        const data = await fetch(`${baseUrl}${url}`, {
                            method: method,
                            headers: headers,
                            body: body,
                            mode: 'cors'
                        })
                        const response = await data.json()
                        if (data.status == 401) {
                            throw response
                        }
                        return response
                    } else {
                        setToken(token)
                        setRefreshToken(refreshToken)
                        headers.set('Authorization', `Bearer ${getToken()}`)
                        const data = await fetch(`${baseUrl}${url}`, {
                            method: method,
                            headers: headers,
                            body: body,
                            mode: 'cors'
                        })
                        return await data.json()
                    }
                }
                else {
                    logout()
                    headers.delete('Authorization')
                    const data = await fetch(`${baseUrl}${url}`, {
                        method: method,
                        headers: headers,
                        body: body,
                        mode: 'cors'
                    })
                    const response = await data.json()
                    if (data.status == 401) {
                        throw response
                    }
                    return response
                }
            }
            throw error
        }
        return await data.json()
    }
    catch (e) {
        throw {
            type: 'notAvailableResource',
            params: {
                method,
                baseUrl,
                url,
                params,
                message: e
            }
        }
    }
}

const fetchToState = (url, {key = 'undefinedKey', params = {}, ...rest}) => async(dispatch) => {
    try {
        dispatch({
            type: '@FETCH_DATA/REQUEST',
            meta: {
                key
            },
            payload: {
                response: null,
                request: {
                    ...rest,
                    params,
                    url

                }
            }
        })
        dispatch({
            type: '@FETCH_DATA/SUCCESS',
            meta: {
                key
            },
            payload: {
                response: await fetcher(url, {...rest, params}),
                request: {
                    ...rest,
                    params,
                    url
                }
            }
        })
    }
    catch (e) {
        dispatch({
            type: '@FETCH_DATA/ERROR',
            meta: {
                key
            },
            payload: {
                error: e
            }
        })
        throw e
    }
}

const setBaseUrl = (url) => {
    BaseUrl = url
}

export {fetcher, setBaseUrl, fetchToState}