import cookie from 'react-cookie'

let tokenName = 'token'
let refreshTokenName = 'refreshToken'
let tokenPrefix = 'Bearer '

function setToken(token, options = {}) {
    cookie.save(tokenName, token, options)
}
function setRefreshToken(refreshToken) {
    cookie.save(refreshTokenName, refreshToken)
}
function getToken() {
    return cookie.load(tokenName)
}
function getRefreshToken() {
    return cookie.load(refreshTokenName) || false
}
function isAuthenticated() {
    return getToken() ? true : false
}
function logout() {
    cookie.remove(tokenName)
    cookie.remove(refreshTokenName)
}
function setTokenName(name) {
    tokenName = name
}
function setRefreshTokenName(name) {
    refreshTokenName = name
}
function setTokenPrefix(prefix) {
    tokenPrefix = prefix
}
function getTokenPrefix() {
    return tokenPrefix
}


export {
    setToken,
    setRefreshToken,
    getToken,
    getRefreshToken,
    isAuthenticated,
    logout,
    setTokenName,
    setRefreshTokenName,
    setTokenPrefix,
    getTokenPrefix
}