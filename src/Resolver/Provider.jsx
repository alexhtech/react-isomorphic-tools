import React from 'react'
import PropTypes from 'prop-types'


class Resolver extends React.PureComponent {
    static propTypes = {
        resolver: PropTypes.object.isRequired,
        children: PropTypes.element.isRequired
    }
    static childContextTypes = {
        resolver: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.resolver = props.resolver
    }

    getChildContext() {
        return {resolver: this.resolver}
    }

    render() {
        return React.Children.only(this.props.children)
    }
}


export {
    Resolver as default
}