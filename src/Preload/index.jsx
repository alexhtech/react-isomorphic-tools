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

const onEnter = (onEnter) => Component => class OnEnter extends React.Component {
    static displayName = `OnEnter(${getDisplayName(Component)})`
    static onEnter = onEnter

    render() {
        return <Component {...this.props}/>
    }
}


export {preload, onEnter}