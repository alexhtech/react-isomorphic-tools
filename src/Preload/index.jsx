import React from 'react'
import getDisplayName from 'react-display-name'

const preload = (preload, options = {}) => Component => class Preload extends React.Component {
    static displayName = `Preload(${getDisplayName(Component)})`
    static preload = preload
    static preloadOptions = options

    render() {
        return <Component {...this.props}/>
    }
}


export {preload}