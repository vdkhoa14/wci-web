import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { DOMAIN } from '../../../constants/appSettings'
import { NavLink } from 'react-router-dom'
import $ from 'jquery'

export default class Link extends Component {

    constructor(props) {
        super(props)
        this.state = {
            outSite: false,
            url: ""
        }
    }
    componentDidMount() {
        let url = this.props.url
        if (url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
            this.setState({
                outSite: true,
                url: url
            })
        }
        else {
            this.setState({
                outSite: false,
                url: url
            })
        }
    }

    render() {
        let {
            outSite,
            url
        } = this.state
        console.log((outSite) + " " + url)
        let {
            title
        } = this.props
        return (
            (!outSite) ? < NavLink to={url}>{title}
            </NavLink> : <a href={url} target="blank">{title}
                </a>
        )
    }
}