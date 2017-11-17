import {request, success, fail} from './actions/fetchToState'
import Fetcher from '../Data/Fetcher'


class FetchToState extends Fetcher {
    fetchToState = (url, options) => async (dispatch) => {
        const key = options.key || 'undefinedKey'
        try {
            dispatch(request({
                key,
                request: {
                    url, options
                }
            }))
            dispatch(success({
                key,
                response: await this.fetcher(url, options),
                request: {
                    url, options
                }
            }))
        } catch (e) {
            dispatch(fail({key, e}))
            throw e
        }
    }
}


export {
    FetchToState as default
}