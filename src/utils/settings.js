import Settings from '../Settings'


export const {
    isAuthenticated,
    logout,
    setToken,
    getToken,
    setRefreshToken,
    getRefreshToken,
    setTokenName,
    setRefreshTokenName,
    setTokenPrefix,
    getTokenPrefix,
    setBaseUrl,
    getBaseUrl
} = new Settings()
