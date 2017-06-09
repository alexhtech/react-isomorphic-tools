import React from 'react'
import PropTypes from 'prop-types'
import RouterContext from 'react-router/lib/RouterContext'
import {loadData} from '../helpers/preload'

export default class AsyncLoader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            props: props,
            loaded: false
        }

        this.mount = false
    }

    static defaultProps = {
        render(props){
            return <RouterContext {...props}/>
        },
        reloadOnPropsChange() {
            return true
        }
    }

    static contextTypes = {
        store: PropTypes.object.isRequired,
    }

    componentDidMount = () => {
        this.mount = true
        loadData(this.context.store, this.props)
    }

    componentWillUnmount() {
        this.mount = false
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.reloadOnPropsChange(this.props, nextProps)) {
            loadData(this.context.store, nextProps).then(()=> {
                this.setState({
                    props: nextProps
                })
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.props !== nextState.props;
    }

    render() {
        return this.props.render(this.state.props)
    }
}