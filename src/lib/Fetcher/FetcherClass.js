import 'isomorphic-fetch'
import 'es6-promise'
import isJSON from 'is-json'
import qs from 'qs'

class FetcherClass {
    constructor(Auth) {
        this.Auth = Auth
        this.baseUrl = ''
        this.fetcher = this.fetcher.bind(this)
        this.body = {}
        this.query = ''
    }

    async fetcher(url, {params, queryParams = {}, type = null, baseUrl = this.getBaseUrl(), method = 'GET', customHeaders = false} = {}) {
        if (type == 'form-data') {
            this.setHeadersData({})
            this.setPlainBody(params)
            this.setQuery(queryParams)
        } else {
            this.setHeadersData({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            switch (method) {
                case 'GET': {
                    this.setQuery(params)
                    this.setBody('')
                }
                    break
                default:
                    this.setQuery(queryParams)
                    this.setBody(params)
                    break
            }
        }

        const body = this.getBody()
        const query = this.getQuery()
        const headers = this.getHeadersData()
        let error = ''

        try {
            this.Auth.isAuthenticated() ?
                this.setAuthorization(this.Auth.getToken()) :
                this.removeAuthorization()

            const data = await fetch(baseUrl + url + query, {
                method,
                headers: customHeaders || headers,
                body,
                mode: 'cors',
                credentials: 'same-origin'
            })

            if (data.status >= 400) {
                if (data.headers.get('content-type').indexOf((item)=>item == 'application/json') != -1) {
                    error = await data.json()
                } else {
                    error = await data.text()
                }
                if (data.status == 401 && this.Auth.isAuthenticated()) {
                    const refreshToken = this.Auth.getRefreshToken()
                    if (refreshToken) {
                        const refresh = await fetch(`${baseUrl}/token/refresh`, {
                            method: 'POST',
                            body: JSON.stringify({refreshToken: refreshToken}),
                            credentials: 'same-origin'
                        })
                        const response = await refresh.json()
                        const {token, refreshToken} = response
                        if (refresh.status == 401) {
                            this.Auth.logout()
                            this.removeAuthorization()
                            const data = await fetch(baseUrl + url + query, {
                                method: method,
                                headers: this.getHeadersData(),
                                body: body,
                                mode: 'cors',
                                credentials: 'same-origin'
                            })
                            const response = await data.json()
                            if (data.status == 401) {
                                throw response
                            }
                            return response
                        } else {
                            this.Auth.setToken(token)
                            this.Auth.setRefreshToken(refreshToken)
                            this.setAuthorization(token)
                            const data = await fetch(baseUrl + url + query, {
                                method: method,
                                headers: this.getHeadersData(),
                                body: body,
                                mode: 'cors',
                                credentials: 'same-origin'
                            })
                            return await data.json()
                        }
                    }
                    else {
                        this.Auth.logout()
                        this.removeAuthorization()
                        const data = await fetch(baseUrl + url + query, {
                            method,
                            headers: this.getHeadersData(),
                            body: body,
                            mode: 'cors',
                            credentials: 'same-origin'
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


        } catch (e) {
            throw {
                type: 'notAvailableResource',
                params: {
                    method,
                    baseUrl,
                    url,
                    params
                },
                error: isJSON(e) ? JSON.parse(e) : e
            }
        }

    }

    //getters/setters

    setBaseUrl = (baseUrl) => {
        this.baseUrl = baseUrl
    }

    getBaseUrl = () => {
        return this.baseUrl
    }

    setHeadersData = (headersData) => {
        this.headersData = new Headers(headersData)
    }

    getHeadersData = () => {
        return this.headersData
    }

    setBody = (body) => {
        this.body = body ? JSON.stringify(body) : undefined
    }

    setPlainBody = body => {
        this.body = body
    }

    getBody = () => {
        return this.body
    }

    setAuthorization = (token) => {
        this.headersData.append('Authorization', this.Auth.getTokenPrefix() + token)
    }

    removeAuthorization = () => {
        this.headersData.delete('Authorization')
    }

    setQuery = (params) => {
        this.query = qs.stringify(params, {addQueryPrefix: true})
    }

    getQuery = () => {
        return this.query
    }
}

export default FetcherClass