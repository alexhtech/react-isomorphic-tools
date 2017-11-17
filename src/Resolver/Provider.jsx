import React from 'react'
import PropTypes from 'prop-types'


class Resolver extends React.Component {
    static propTypes = {
        resolver: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
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

    componentDidMount() {
        const {history} = this.props
        this.unsubscribeFromHistory = history.listen(this.handleLocationChange)
    }

    componentWillUnmount() {
        if (this.unsubscribeFromHistory) this.unsubscribeFromHistory()
    }

    handleLocationChange = () => {
        const {resolver, history} = this.props
        resolver.isLock() ? resolver.unLock() : resolver.resolve(history.location)
    }

    render() {
        return React.Children.only(this.props.children)
    }
}


export {
    Resolver as default
}