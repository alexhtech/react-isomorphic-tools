import {request, success, fail} from './actions/fetchToState'
import Fetcher from '../Data/Fetcher'


class FetchToState extends Fetcher {
    fetchToState = (url, {key = 'undefinedKey', params = {}, ...rest}) => async (dispatch) => {
        try {
            dispatch(request({
                key,
                request: {
                    ...rest, params, url
                }
            }))
            dispatch(success({
                key,
                response: await this.fetcher(url, {...rest, params}),
                request: {
                    ...rest, params, url
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