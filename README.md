# react-isomorphic-tools

This library contains many tools when helps to build SSR such as:

> Fetcher, fetchToState

> Authorization (react-cookie)

> Preload Data to component on client

> Load(fetch) data on server side

> helpers...


### Auth

```js
import {Auth} from 'react-isomorphic-tools'
```

methods:
* setToken
* setRefreshToken
* getToken
* getRefreshToken
* isAuthenticated
* logout
* setTokenName || default 'token'
* setRefreshTokenName || default 'Bearer '
* setTokenPrefix
* getTokenPrefix


setToken - establishes working token for Fetcher&&FetchToState
When calling Fetcher() if isAuthenticated() === true then add to headers 
key Authorization = getTokenPrefix()+getToken()

If token is outdated (and refresh token is set) server must respond http status code == 401 for that would run process token refresh
Will be send POST request to http://BaseUrl/token/refresh with params:{refreshToken} and Fetcher will wait new token
and refreshToken for update then follow rerequest


## Fetcher

```js
import {fetcher, setBaseUrl} from 'react-isomorphic-tools'


setBaseUrl('http://api.itboost.org/app_dev.php/api')

fetcher('/events', {
  method: 'GET', /* default 'GET') */
  params:{},
  baseUrl: null, /* custom baseUrl */
  type: 'form-data' /* (default json) */
})
```

> all parameters will be added to request as query string if method == ('GET'||'DELETE')
other in request body

## FetchToState


```js
import React from 'react'
import {connect} from 'react-redux'
import {fetchToState} from 'react-isomorphic-tools'

@connect(state=>({
    eventsShow: state.getIn(['fetchData', 'eventsShow'])
}),{fetchToState})
export default class App extends React.Component{
   
    componentDidMount = () => {
        const {fetchData, params} = this.props
        fetchToState(`/events/${params.id}`, {
            params:{
                key: 'value'
            },
            key: 'eventsShow',
            method: 'GET', 
            baseUrl: 'http://example.com/api'
        })
    }
}
```

## Decorator Preload

```js

import React from 'react'
import {preload} from 'react-isomorphic-tools'
import {connect} from 'react-redux'

@preload(({fetchToState})=> {
    return fetchToState('/events', {
        key: 'eventsList'
    })
})
@connect(state=>({
    eventsList: state.getIn(['fetchData', 'eventsList'])
}))
export default class Page extends React.Component {
    static displayName = 'TestPage'

    render() {
        return (
            <div>
            </div>
        )
    }
}
```

In preload(preload, restProps)

preload contains: 

* getState
* dispatch
* routes
* params
* location
* router
* fetcher
* fetchToState: (url, params) => dispatch(fetchToState(url, params))

