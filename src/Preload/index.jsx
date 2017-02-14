import React from 'react'
import getDisplayName from 'react-display-name'

const preload = preload => Component => class Preload extends React.Component {
    static displayName = `Preload(${getDisplayName(Component)})`
    static preload = preload
    render(){
        return <Component {...this.props}/>
    }
}


export {preload}