import FetchToState from './FetchToState'
import ReduxResolver from '../Resolver/ReduxResolver'



export const {
    resolve,
    push,
    replace
} = new ReduxResolver()

export const {
    fetchToState
} = new FetchToState()