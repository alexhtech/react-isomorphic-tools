import {request, success, fail} from '../../actions/fetchToState'

class FetchToStateClass {
    constructor(Fetcher) {
        this.Fetcher = Fetcher
    }

    fetchToState = (url, {key = 'undefinedKey', params = {}, ...rest}) => async(dispatch) => {
        try {
            dispatch(request({key, request: {...rest, params, url}}))
            dispatch(success({key, response: await this.Fetcher.fetcher(url, {...rest, params})}))
        }
        catch (e) {
            dispatch(fail({key, e}))
            throw e
        }
    }

}

export default FetchToStateClass