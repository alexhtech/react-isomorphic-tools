import cookie from 'react-cookie'

class AuthClass {
    constructor(token = 'token', refreshToken = 'refreshToken', tokenPrefix = 'Bearer ') {
        this.setTokenName(token)
        this.setRefreshTokenName(refreshToken)
        this.setTokenPrefix(tokenPrefix)
    }

    isAuthenticated = () => {
        return this.getToken() ? true : false

    }
    logout = () => {
        this.setToken(null)
        this.setRefreshToken(null)
    }


    // getters/setters

    setToken = (token, options = {}) => {
        this.token = token
        this.token ?
            cookie.save(this.tokenName, this.token, options) :
            cookie.remove(this.tokenName, options)
    }

    getToken = () => {
        return this.token
    }

    setRefreshToken = (refreshToken, options = {}) => {
        this.refreshToken = refreshToken
        this.refreshToken ?
            cookie.save(this.refreshTokenName, this.refreshToken) :
            cookie.remove(this.refreshTokenName, options)
    }

    getRefreshToken = () => {
        return this.refreshToken
    }

    setTokenName = (tokenName) => {
        this.tokenName = tokenName
        this.token = cookie.load(tokenName)
    }

    setRefreshTokenName = (refreshTokenName) => {
        this.refreshTokenName = refreshTokenName
        this.refreshToken = cookie.load(refreshTokenName)
    }

    setTokenPrefix = (tokenPrefix) => {
        this.tokenPrefix = tokenPrefix
    }

    getTokenPrefix = () => {
        return this.tokenPrefix
    }
}

export default AuthClass