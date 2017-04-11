import {onEnter} from './'
import {isAuthenticated} from '../lib/Auth'

const Check = ({roles = [], denyRoles = [], cb, anon = false}) => (Component) => {
    return onEnter(async({getState, redirect}) => {
        const user = getState().getIn(['authentication', 'user'])
        if (isAuthenticated() && user) {
            let hasRole = false
            let userRoles = user.get('roles').toJS()
            for (let i in userRoles) {
                let role = userRoles[i]
                for (let i in denyRoles) {
                    if (denyRoles.hasOwnProperty(i) && role == denyRoles[i]) {
                        cb ? await cb({getState, redirect}) : redirect('/')
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
                cb ? await cb({getState, redirect}) : redirect('/')
            }
        } else if (!anon) {
            cb ? await cb({getState, redirect}) : redirect('/')
        }
    })(Component)
}


export {Check}