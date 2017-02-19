import Immutable from 'immutable'

const modals = (state = Immutable.Map({}), action)=> {
    switch (action.type) {
        case '@@modals/open':
            return state.set(action.meta, true)

        case '@@modals/close':
            return state.set(action.meta, false)

        default:
            return state
    }
}

export {modals as ImmutableModals}