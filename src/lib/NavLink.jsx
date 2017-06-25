import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {push, replace} from 'react-router-redux'
import resolveRoutes from './resolveRoutes'
import {stringify} from 'query-string'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {fail} from '../actions/preload'
import {NavLink} from 'react-router-dom'


@withRouter
@connect(null, dispatch=>({
    actions: bindActionCreators({
        push, replace, fail
    }, dispatch)
}))
export default class NavLinkWrapper extends React.Component {
    constructor() {
        super();
        this.lock = false
    }

    static contextTypes = {
        store: PropTypes.object.isRequired,
    }

    static propTypes = NavLink.propTypes

    handleClick = (e) => {
        e.preventDefault()
        let to

        if (typeof this.props.to == 'object') {
            let {query, ...location} = this.props.to
            const string = stringify(query)
            to = {...location, search: string.length != 0 ? '?' + string : ''}
        } else {
            to = {pathname: this.props.to}
        }

        !this.lock && resolveRoutes({location: to, store: this.context.store}).then(()=> {
            this.lock = false
            this.props.replace ? this.props.actions.replace(to) : this.props.actions.push(to)
        }).catch((e)=> {
            this.lock = false
            this.props.actions.fail(e, to)
        })

        this.lock = true
    }

    render() {
        const {to:{query, ...to}, replace, exact, strict, location, activeClassName, className, activeStyle, style, isActive, children} = this.props
        return (
            <NavLink
                onClick={this.handleClick}
                to={{...to, search: query ? '?' + stringify(query) : undefined}}
                replace={replace}
                exact={exact}
                strict={strict}
                location={location}
                activeClassName={activeClassName}
                className={className}
                activeStyle={activeStyle}
                style={style}
                isActive={isActive}
                children={children}
            />
        )
    }
}