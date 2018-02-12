import React, { Component } from 'react';
import './GiftPage.css';
import { config } from '../config.js'
import { httpget } from '../util.js'
import Progress from './Progress.js'

class GiftDiv extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                <div style={{height: '100', width: '100'}}>
                    <img src="https://s1.hdslb.com/bfs/static/blive/blfe-live-room/static/img/gift-images/image-png/gift-6.png"></img>
                </div>
                <div style={{height: '100'}}>
                    <div>1</div>
                    <div>2</div>
                    <div style={{width: '300'}}>
                        <Progress nums={10} index={10} progressColor='#dabb84' />
                    </div>
                </div>
            </div>
        )

    }
}

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

    genGiftDivList() {
        return (
            <GiftDiv></GiftDiv>
        )
    }

    render() {
        return (
            <div style={this.state.textStyle}>
                {this.genGiftDivList()}
                {/* <Progress nums={10} index={2} progressColor='#dabb84' /> */}
            </div>
        )
    }
}

export default GiftPage1