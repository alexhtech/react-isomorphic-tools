### Motivation
The first thing of motivation to make this library is an idea to gather together all
features what my team is used in projects that we was designed in that time. 
The second thing it is that what I wanted to make just open source library 
to help people to decide own problems with which I faced. The third thing 
it is that I want grow up, and I want to involve more people to this project 
and that they are also can design auxiliary library is better.

### Functionality 


* - Load data 
  * - [x] before transition in Client Side
  * - [x] Load data in Server Side it is making the store with all data what it needs to render application is properly
* - Autorization System
  * - [x] Store token, refresh token in cookie and work with them
  * - [x] Fetching remote resource with token
  * - [x] Limitation before transition, for example: if you haven't properly role (redirects)
* - Chunks
  * - [x] Load chunks like remote resource over fetch but just chunk for app, we can define in routes config 
  the function that will return promise, example below
  
* - Handle Errors
  * - [x] If application has an error before transition you will redirect to error page with detail info about the error
  * - [x] The same for server side, you just will redirect by expressjs to another route for detail info about error


to be continued...
