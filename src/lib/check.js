import {Auth} from './'

const check = ({getState, redirect, ...rest}) => async({roles = [], denyRoles = [], cb, anon = false}) => {
    const user = getState().getIn(['authentication', 'user'])
    const location = getState().get('router').location
    if (Auth.isAuthenticated() && user) {
        let hasRole = false
        let userRoles = user.get('roles').toJS()
        for (let i in userRoles) {
            let role = userRoles[i]
            for (let i in denyRoles) {
                if (denyRoles.hasOwnProperty(i) && role == denyRoles[i]) {
                    cb ? await cb({
                        getState,
                        redirect, ...rest
                    }) : redirect(`/?from=${location.pathname}${location.search}`)
                    return
                }
            }
            for (let i in roles) {
                if (roles.hasOwnProperty(i) && role == roles[i]) {
                    hasRole = true
                }
            }
        }

        if (!hasRole) {
            cb ? await cb({getState, redirect, ...rest}) : redirect(`/?from=${location.pathname}${location.search}`)
        }
    } else if (!anon) {
        cb ? await cb({getState, redirect, ...rest}) : redirect(`/?from=${location.pathname}${location.search}`)
    }
}

export default check
