import Immutable from 'immutable'

export const preload = (state = {components: []}, action) => {
    switch (action.type) {
        case '@@preload/push': {
            const components = state.components

            const index = components.findIndex((item)=>item.name == action.meta.name)
            if (index != -1) {
                components[index] = action.meta
            } else {
                components.push(action.meta)
            }

            return {...state, components}
        }

        default: {
            return state
        }
    }
}

export const ImmutablePreloadReducer = (state = Immutable.fromJS({components: []}), action) => {
    switch (action.type) {
        case '@@preload/push': {
            const index = state.get('components').findIndex((item)=>item.get('name') == action.meta.name)
            if (index != -1) {
                return state.set('components', state.get('components').update(index, ()=>Immutable.Map(action.meta)))
            } else {
                return state.set('components', state.get('components').push(Immutable.Map(action.meta)))
            }
        }
        case '@@preload/parseError': {
            return state.set('error', JSON.parse(action.payload))
        }
        default:
            return state
    }
}
