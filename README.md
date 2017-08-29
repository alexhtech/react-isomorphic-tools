### Motivation ###
The first thing of motivation to make this library is an idea to gather together all
features what my team is used in projects that we was designed in that time. 
The second thing it is that what I wanted to make just open source library 
to help people to decide own problems with which I faced. The third thing 
it is that I want grow up, and I want to involve more people to this project 
and that they are also can design auxiliary library is better.

### Functionality ###

* - Load data 
  * - [x] before transition in Client Side
  * - [x] Load data in Server Side it is making the store with all data what it needs to render application is properly
* - Autorization System
  * - [x] Store token, refresh token in cookie and work with them
  * - [x] Fetching remote resource with token
  * - [x] Limitation before transition, for example: if you haven't properly role (redirects)
* - Chunks
  * - [x] Load chunks like remote resource over fetch but just chunk for app, we can define in routes config 
  the function that will return promise, example you can see below
  
* - Handle Errors
  * - [x] If application has an error before transition you will redirect to error page with detail info about the error
  * - [x] The same for server side, you just will redirect by expressjs to another route for detail info about error

### Boilerplate ###

[https://github.com/aleksdp/react-isomorphic-example](https://github.com/aleksdp/react-isomorphic-example)

### Descriptions

#### reducers

- authentication
- fetchData
- navigator
- modals

> Authentication it is stores current user data, you can rewrite this reducer for yourself

> FetchData - it is common reducer that stores all fetched data from remote server

> Navigator reducer needs to store info about browser what you are using and current locale

> Modals - it is common reducer to store data about opening or closing modals window

#### actions

##### Authorization


```js
// actions/authorization.js
import {fetcher} from 'react-isomorphic-tools'
import {AUTH_LOGIN_SUCCESS, AUTH_LOGOUT_SUCCESS} from 'react-isomorphic-tools/lib/constants'

const onSubmit = async (form) => dispatch => {
  const user = await fetcher('/login', { //if your endpoint is returns object of current user we can catch it and put to store
    method: 'POST',
    params: {
      login: form.login,
      password: form.password
    }
  })
  dispatch({
    type: AUTH_LOGIN_SUCCESS,
    payload: user
  })
}

const logout = () => dispatch => {
  dispatch({
    type: AUTH_LOGOUT_SUCCESS // will remove current user from store
  })
}
```

##### Navigator

```js
import {setLocale, setUserAgent} from 'react-isomorphic-tools'

//you can use it something like this

const defaultLocale = 'en'
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36
'

store.dispatch(setLocale(defaultLocale))
store.dispatch(setUserAgent(userAgent))
```

> It's more neccessary for server side rendering to define locale and userAgent that rendering will properly

##### Modals

```js
import {openModal, closeModal, closeAllModals} from 'react-isomorphic-tools'

const open = () => dispatch {
  dispatch(openModal('test'))
}

const close = () => dispatch => {
  dispatch(closeModal('test'))
}

const closeAll = () => dispatch => {
  dispatch(closeAllModals())
}
```

##### Preload actions (fethcData reducer)

> There are two options how to use fetchData

```js
// actions/posts.js
//// first

import {fetchToState} from 'react-isomorphic-tools'

const fetchItems = (userId) => dispatch => {
  return dispatch(fetchToState('/posts', { // will return promise
    key: 'posts',
    method: 'GET',
    params: {
      filter:{
        userId
      }
    }
  }))
}

//// second
import {fetcher} from 'react-isomorphic-tools'
import {request, success, fail} from 'react-isomorphic-tools/lib/actions/fetchToState'

const fetchItems = async (userId) => dispatch => {
  const key = 'posts'
    const object = { 
      method: 'GET',
      params: {
        filter:{
          userId
        }
      }
    }
    const url = '/posts'
    
  try{
    
    request({key, request {params: object.params, url}})
    
    const posts = fetcher(url, object)) // will return promise
    
    success({key, request {params: object.params, url}, response: posts})
    
  }
  catch(e){
    dispatch(fail({key, e}))
  }
}
```

> Don't you seem that the first example is simpler?) Yes, the function fetchToState just wrapped fetcher 
> but for it we need to define key, to tell reducer that we want to store data in defined key of store.
> It's simple, we want to make these things simpler!


#### Usage fetchToState in Container

```js
// containers/posts.jsx
import React from 'react'
import {connect} from 'react-redux'

@connect(state=>({
  posts: state.fetchData.posts && state.fetchData.posts.response || [] // you can subscribe to only response or...
  postsObject: state.fetchData.posts || {} // subscribe to whole object, it includes response and request object
})
exoport default class PostsContainer extends React.Component {
  render(){
    console.log(this.props.posts)
    console.log(this.props.postsObject)
    return return null
  }
}
```
