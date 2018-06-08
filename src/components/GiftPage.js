import React, { Component } from 'react';
import './GiftPage.css';
import { config } from '../config.js'
import { httpget } from '../util.js'

class GiftPage extends Component {

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
        await this.setGiftConfig()
        await this.setDataState()
        await this.setTextStyle()
        let dataTimer = setInterval(this.setDataState.bind(this), 2000)
        this.setState({dataTimer})
        // setTimeout(() => {
        //     console.log(this.state.data)
        // }, 2000);
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
                giftConfig[val.name] = {
                    'icon_id': val.icon_id,
                    'img_basic': val.img_basic,
                }
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

    async setTextStyle() {
        let ret = await httpget(`http://${config.host}:${config.port}/api/get/displaygiftconfig`)
        if (ret && ret.ok === 1) {
            let c1 = ret.data.fontColor
            let c2 = ret.data.textShadowColor
            this.setState({
                textStyle: {
                    color: `#${c1}`,
                    textShadow: `#${c2} 3px 0 4px,#${c2} 0 3px 4px,#${c2} -3px 0 4px,#${c2} 0 -3px 4px`
                }
            })
        }
        else {
            console.log('err: ', ret)
        }
    }

    genGiftDivList() {
        let giftData = this.state.data
        let giftConfig = this.state.giftConfig
        let giftDivList = giftData.map((val, idx) => {
            console.log(giftConfig)
            console.log(val)
            let iconId = giftConfig[val.gift_name]['icon_id']
            let imgUrl = giftConfig[val.gift_name]['img_basic']
            return (
                <div className={'gift-span-wrapper'} key={`span-div-${idx}`}>
                    <img src={imgUrl}  alt={val.gift_name} />
                    <span className={`gift-span ${val.count >= val.goal ? 'heartbeat' : ''}`}>{val.count}/{val.goal}</span>    
                    <span className={`gift-span ${val.count >= val.goal ? 'heartbeat' : ''}`}>{val.reward}</span>
                </div>
            )
        })
        return giftDivList
    }

    render() {
        return (
            <div className="hua-text" id="text-wrapper" style={this.state.textStyle}>
                {this.genGiftDivList()}
            </div>
        )
    }
}

export default GiftPage