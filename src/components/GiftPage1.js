import React, { Component } from 'react';
import './GiftPage.css';
import { config } from '../config.js'
import { httpget } from '../util.js'

class GiftPage1 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            giftConfig: {},
            data: [],
            dataTimer: null,
            textStyle: {},
        }
    }

    async componentDidMount() {
        // await this.setGiftConfig()
        // await this.setDataState()
        // let dataTimer = setInterval(this.setDataState.bind(this), 2000)
        // this.setState({dataTimer})
    }

    componentWillUnmount() {
        // clearInterval(this.state.dataTimer)
        // this.setState({dataTimer: null})
    }

    render() {
        return (
            <div style={this.state.textStyle}>
                123
            </div>
        )
    }
}

export default GiftPage1