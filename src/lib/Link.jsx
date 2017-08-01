import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {push, replace} from 'react-router-redux'
import resolveRoutes from './resolveRoutes'
import {stringify} from 'qs'
import {withRouter} from 'react-router-dom'
import {fail} from '../actions/preload'
import {Link} from 'react-router-dom'


@withRouter
@connect(null, dispatch=>({
    actions: bindActionCreators({
        push, replace, fail
    }, dispatch)
}))
export default class LinkWrapper extends React.Component {
    constructor() {
        super();
        this.lock = false
    }

    static propTypes = Link.propTypes

    static contextTypes = {
        store: PropTypes.object.isRequired,
    }

    parse = (to) => {

        if (typeof to == 'object') {
            let {query, ...location} = to
            return {...location, search: stringify(query, {addQueryPrefix: true})}
        } else {
            return {pathname: to}
        }
    }

    handleClick = (e) => {
        e.preventDefault();

        const to = this.parse(this.props.to)

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
        const {children, style, className} = this.props
        const to = this.parse(this.props.to)
        return (
            <Link onClick={this.handleClick} to={to} children={children} style={style} className={className}/>
        )
    }
}