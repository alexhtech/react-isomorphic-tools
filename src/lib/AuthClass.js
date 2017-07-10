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
        const remove = !!token;
        remove ?
            cookie.remove(this.tokenName, options) :
            cookie.save(this.tokenName, this.token, options)
    }

    getToken = () => {
        return cookie.load(this.tokenName)
    }

    setRefreshToken = (refreshToken, options = {}) => {
        const remove = !!refreshToken;
        remove ?
            cookie.remove(this.refreshTokenName, options) :
            cookie.save(this.refreshTokenName, refreshToken)
    }

    getRefreshToken = () => {
        return cookie.load(this.refreshTokenName)
    }

    setTokenName = (tokenName) => {
        this.tokenName = tokenName
    }

    setRefreshTokenName = (refreshTokenName) => {
        this.refreshTokenName = refreshTokenName
    }

    setTokenPrefix = (tokenPrefix) => {
        this.tokenPrefix = tokenPrefix
    }

    getTokenPrefix = () => {
        return this.tokenPrefix
    }
}

export default AuthClass