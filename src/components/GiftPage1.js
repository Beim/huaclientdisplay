import React, { Component } from 'react';
import './GiftPage1.css';
import { config } from '../config.js'
import { httpget } from '../util.js'
import Progress from './Progress.js'

class GiftDiv extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                <div style={{height: '100px', width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img style={{height: '85px', width: '85px'}} src={`https://s1.hdslb.com/bfs/static/blive/blfe-live-room/static/img/gift-images/image-png/gift-${this.props['iconId']}.png`}></img>
                </div>
                <div style={{height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <div className='hua-text1' style={{margin: '2px'}}>赠送：{this.props['gift_name']}</div>
                    <div className='hua-text1' style={{margin: '2px'}}>许愿：{this.props['reward']}</div>
                    <div style={{width: '140px', margin: '2px'}}>
                        <Progress nums={this.props['goal']} index={this.props['count']} progressColor='#23ade5' backColor='#d0d0d0' textColor='#ffc09f' />
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
        }
    }

    async componentDidMount() {
        await this.setGiftConfig()
        await this.setDataState()
        let dataTimer = setInterval(this.setDataState.bind(this), 2000)
        this.setState({dataTimer})
    }

    componentWillUnmount() {
        clearInterval(this.state.dataTimer)
        this.setState({dataTimer: null})
    }

    async setGiftConfig() {
        let ret = await httpget(`http://${config.host}:${config.port}/api/get/giftconfig`)
        if (ret && ret.ok === 1) {
            let giftConfig = {}
            ret.data.forEach((val) => {
                giftConfig[val.name] = val.icon_id
            })
            this.setState({giftConfig})
        }
        else {
            console.log('err: ', ret)
        }
    }

    async setDataState() {
        let ret = await httpget(`http://${config.host}:${config.port}/api/get`)
        if (ret && ret.ok === 1) {
            let data = ret.data
            this.setState({data})
        }
        else {
            console.log('err: ', ret)
        }
    }

    genGiftDivList() {
        return this.state.data.map((value, index) => {
            return <GiftDiv key={`giftdiv${index}`} gift_name={value['gift_name']} reward={value['reward']} goal={value['goal']} count={value['count']} iconId={this.state.giftConfig[value['gift_name']]}></GiftDiv>
            // return <GiftDiv key={`giftdiv${index}`} gift_name={value['gift_name']} reward={value['reward']} goal={10} count={3} iconId={this.state.giftConfig[value['gift_name']]}></GiftDiv>
        })
    }

    render() {
        return (
            <div style={this.state.textStyle}>
                {this.genGiftDivList()}
            </div>
        )
    }
}

export default GiftPage1