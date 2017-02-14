import Immutable from 'immutable'
import {LOCATION_CHANGE} from 'react-router-redux'

const routing = (state = Immutable.fromJS({locationBeforeTransitions: null}), action) => {
    if (action.type === LOCATION_CHANGE) {
        return state.set('locationBeforeTransitions', action.payload);
    }

    return state;
}

export {routing as ImmutableRoutingReducer}