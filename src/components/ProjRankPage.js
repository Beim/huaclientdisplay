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

class ProjRankPage extends Component {
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
        const projSpanWrapperStyle = {
            fontSize: '30px',
            marginTop: '50px',
        }
        // const projFisrtSpanWrapperStyle = {
        //     fontSize: '50px',
        //     marginTop: '20px',
        // }
        if (onlist.length === 0) {
            return (
                <div style={projSpanWrapperStyle}>
                    咸鱼现在什么都不想干
                </div>
            )
        }
        else if (onlist.length === 1) {
            return (
                <div>
                    <div style={projSpanWrapperStyle}>
                        <span>进行中：</span>
                        <span className="proj-span">{onlist[0].name}</span>
                        <span className="proj-span">{parseS2M(onlist[0].duration)}</span>
                    </div>
                    <div style={projSpanWrapperStyle}>
                        <span>下一个：下面没有了</span>
                    </div>
                </div>
            )
        }
        else {
            let divList = []
            let item = onlist[0]
            divList.push(
                <div style={projSpanWrapperStyle}>
                    <span>进行中：</span>
                    <span className="proj-span">{item.name}</span>
                    <span className="proj-span">{parseS2M(item.duration)}</span>
                </div>
            )
            item = onlist[1]
            divList.push(
                <div style={projSpanWrapperStyle}>
                    <span>下一个：</span>
                    <span className="proj-span">{item.name}</span>
                    <span className="proj-span">{parseS2M(item.duration)}</span>
                </div>
            )
            return (
                <div>
                    {divList}
                </div>
            )
        }
    }
    render() {
        return (
            <div className="hua-text">
                {this.genGiftDivList()}
            </div>
        )
    }
}

export default ProjRankPage