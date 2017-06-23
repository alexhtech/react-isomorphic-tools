import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import resolveRoutes from './resolveRoutes'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {fail} from '../actions/preload'


@withRouter
@connect(null, {push, fail})
export default class LinkWrapper extends React.Component {
    constructor() {
        super();
        this.lock = false
    }

    static contextTypes = {
        store: PropTypes.object.isRequired,
    }

    handleClick = (e) => {
        e.preventDefault()
        let to

        if (typeof this.props.to == 'object') {
            let {query, ...location} = this.props.to
            const string = queryString.stringify(query)
            to = {...location, search: string.length != 0 ? '?' + string : ''}
        } else {
            to = {pathname: this.props.to}
        }

        !this.lock && resolveRoutes({location: to, store: this.context.store}).then(()=> {
            this.lock = false
            this.props.push(to)
        }).catch((e)=> {
            this.lock = false
            this.props.fail(e, to)
        })

        this.lock = true
    }

    render() {
        const {to} = this.props
        return (
            <a onClick={this.handleClick} href={typeof to == 'object' ? to.pathname : to}>{this.props.children}</a>
        )
    }
}