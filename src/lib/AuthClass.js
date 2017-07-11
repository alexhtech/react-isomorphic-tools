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
        const save = !!token;
        save ?
            cookie.save(this.tokenName, this.token, options) :
            cookie.remove(this.tokenName, options)
    }

    getToken = () => {
        return cookie.load(this.tokenName)
    }

    setRefreshToken = (refreshToken, options = {}) => {
        const save = !!refreshToken;
        save ?
            cookie.save(this.refreshTokenName, refreshToken) :
            cookie.remove(this.refreshTokenName, options)
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