# react-security-fetcher


## Utils

* Auth
* apiCall
* fetchData (with redux)

###Auth

methods:

* setToken
* getToken
* setRefreshToken
* getRefreshToken
* isAuthenticated
* logout

##### decorator @Check

in pages/*


```js
import React from 'react'
import {Check} from 'react-security-fetcher'

@Check({roles: ['ROLE_USER']})

export default class App extends React.Component{
    render(){
        return (<div>security component</div>)
    }
}
```

###apiCall

methods:

* redux
* fetchData

##### redux (usage in @preload)

```js
import React from 'react'
import {preload} from 'react-isomorphic-render/redux'
import {connect} from 'react-redux'

@preload(({dispatch, parameters, fetchData})=>dispatch(fetchData(`/events/${parameters.id}`, 'eventsShow')))
@connect((state)=>{
    return {
        eventsShow: state.fetchData.eventsShow.response
    }
})
export default class Event extends React.Component{
    render(){
        const {eventsShow} = this.props
        return (
            <div>
                Event component ;)<br/>
                <div dangerouslySetInnerHTML={{__html: eventsShow.description}}></div>
            </div>
        )
    }
}
```




#### redux as fetchData

```js
import React from 'react'
import {connect} from 'react-redux'
import {redux as fetchData} from 'react-security-fetcher'
import {bindActionCreators} from 'redux'

@connect(state=>({
    eventsShow: state.fetchData.eventsShow
}), dispatch=>({
    actions: bindActionCreators({fetchData}, dispatch)
}))
export default class App extends React.Component{
   
    componentDidMount = () => {
        const {actions: {fetchData}, params} = this.props
        fetchData(`/events/${params.id}`, 'eventsShow', 'GET', {
            params:{
                key: 'value'
            },
            base_url: 'http://example.com/api'
        })
    }
    
    render(){
        const {eventsShow = {response: {items: []}}} = this.props
        return(
            <div></div>)
    }
}
```



```js
redux(URL, key, method = 'GET', params)
```
* URL - without prefix
* key - key in redux storage for save
* method - 'get/post/put ...'
* params - {
    params: - will be added to request
    base_url: - custom base url
    type: - formData or json, default json
}




##### fetchData

```js
fetchData(URL, method = 'GET', params)
```
* URL - without prefix
* method - 'get/post/put ...'
* params - {
    params: - will be added to request
    base_url: - custom base url
    type: - formData or json, default json
}

> all parameters will be added to request as query string if method == ('GET'||'DELETE')
other in request body

> for use type='form-data' must be attach new FormData() object to params
> fetchData(URL, method = 'POST', {type: 'form-data', params: new FormData()})


