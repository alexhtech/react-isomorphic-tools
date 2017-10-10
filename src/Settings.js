import cookie from 'react-cookie'


class Settings {
    constructor(token = 'token', refreshToken = 'refreshToken', tokenPrefix = 'Bearer ') {
        this.setTokenName(token)
        this.setRefreshTokenName(refreshToken)
        this.setTokenPrefix(tokenPrefix)
    }

    isAuthenticated = () => !!this.getToken()

    logout = () => {
        this.setToken(null)
        this.setRefreshToken(null)
    }

    setToken = (token, options = {}) =>
        !token ?
            cookie.remove(this.tokenName, options) :
            cookie.save(this.tokenName, token, options)


    getToken = () => cookie.load(this.tokenName)

    setRefreshToken = (refreshToken, options = {}) =>
        !refreshToken ?
            cookie.remove(this.refreshTokenName, options) :
            cookie.save(this.refreshTokenName, refreshToken)

    getRefreshToken = () => cookie.load(this.refreshTokenName)

    setTokenName = (tokenName) => {
        this.tokenName = tokenName
    }

    setRefreshTokenName = (refreshTokenName) => {
        this.refreshTokenName = refreshTokenName
    }

    setTokenPrefix = (tokenPrefix) => {
        this.tokenPrefix = tokenPrefix
    }

    getTokenPrefix = () => this.tokenPrefix

    setBaseUrl = (baseUrl) => {
        this.baseUrl = baseUrl
    }

    getBaseUrl = () => this.baseUrl
}


export {
    Settings as default
}
