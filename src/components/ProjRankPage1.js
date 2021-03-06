import React, { Component } from 'react';
import './ProjRankPage.css';
import { config } from '../config.js'
import { httpget } from '../util.js'

const parseS2M = (sec) => {
    sec = parseInt(sec)
    let m = Math.floor(sec / 60)
    if (m < 10) {
        m = '0' + m
    }
    let s = sec % 60
    if (s < 10) {
        s = '0' + s
    }
    return `${m}:${s}`
}

class ProjRankPage1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onlist: [],
            offlist: [],
            dataTimer: null,
        }
    }

    async componentDidMount() {
        await this.setDataList()
        let dataTimer = setInterval(this.setDataList.bind(this), 1000)
        this.setState({dataTimer})
    }

    componentWillUnmount() {
        clearInterval(this.state.dataTimer)
        this.setState({dataTimer: null})
    }

    async setDataList() {
        let ret = await httpget(`http://${config.host}:${config.port}/api/get/projs`)
        if (ret && ret.ok === 1) {
            this.setState({
                onlist: ret.data.onlist,
                offlist: ret.data.offlist,                
            })
        }
        else {
            console.log('err: ', ret)
        }
    }

    genGiftDivList() {
        const onlist = this.state.onlist
        const offlist = this.state.offlist
        const projSpanWrapperStyle = {
            fontSize: '30px',
            marginTop: '50px',
        }
        const spanStyle1 = {
            width: '150px',
            minWidth: '150px',
            display: 'inline-block',
        }
        const spanStyle2 = {
            width: '200px',
            minWidth: '200px',
            display: 'inline-block',
        }
        const divList = []
        for (let idx in onlist) {
            let item = onlist[idx]
            let length = divList.length
            divList.push(
                <div style={projSpanWrapperStyle}>
                    <span style={spanStyle1}>{parseInt(idx) === 0 ? "进行中：" : ""}</span>
                    <span style={spanStyle2}>{item.name}</span>
                    <span>{parseS2M(item.duration)}</span>
                </div>
            )
        }
        for (let idx in offlist) {
            let item = offlist[idx]
            let style = projSpanWrapperStyle
            divList.push(
                <div style={projSpanWrapperStyle}>
                    <span style={spanStyle1}>{""}</span>
                    <span style={spanStyle2}>{item.name}</span>
                    <span>已完成</span>
                </div>
            )
        }
        return (
            <div>
                {divList}
            </div>
        )
    }
    render() {
        return (
            <div className="hua-text">
                {this.genGiftDivList()}
            </div>
        )
    }
}

export default ProjRankPage1