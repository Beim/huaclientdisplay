import React, { Component } from 'react';

export default class Progress extends Component {

    constructor(props) {
        super(props)
        this.state = {
            textTimer: null,
        }
    }

    // componentDidMount() {
    //     setTimeout(this.setCountTextMarginInterval, 1000)
    //     const textTime = setInterval(this.setCountTextMarginInterval, 5000)
    //     this.setState({textTime})
    // }

    // componentWillUnmount() {
    //     clearInterval(this.state.textTimer)
    //     this.setState({textTime: null})
    // }

    // setCountTextMarginInterval() {
    //     const items = document.getElementsByClassName('countText')
    //     for (let item of items) {
    //         let width = item.offsetWidth
    //         let marginLeft = `${-(width + 5)}px`
    //         item.style['margin-left'] = marginLeft
    //     }
    // }

   renderProgress () {
        const progressItemStyle1 = {
            height: '100%',
            width: `${this.props.index / this.props.nums * 100}%`,
            backgroundColor: this.props.progressColor,
            // zIndex: 1,
        }
        const progressItemStyle2 = {
            height: '100%',
            width: `${(1 - this.props.index / this.props.nums) * 100}%`,
            backgroundColor: this.props.backColor,
            // zIndex: 1,
        }
        return [
            <div style={progressItemStyle1} key={'progressBlock1'}></div>,
            <div style={progressItemStyle2} key={'progressBlock2'}></div>
        ]
   }

   render() {

       const progressArticleStyle = {
            height: 17,
            // border: `1px solid ${this.props.backColor}`,
            width: '100px',
            display: '-webkit-flex',
            borderRadius: 2,
            overflow: 'hidden',
        };

       return (
           <div style={{display: 'flex', alignItems: 'center'}}>
               <div style={progressArticleStyle}>
                   {this.renderProgress()}
               </div>
               <div className='countText' style={{marginLeft: '5px', fontWeight: 900, fontSize: '100%', color: this.props.textColor}}>
                   {this.props.index}/{this.props.nums}
               </div>
           </div>
       )
   }
}

// Progress.propTypes = {
//    nums: PropTypes.number.isRequired,
//    index: PropTypes.number.isRequired,
//    progressColor: PropTypes.string.isRequired,
//    backColor: PropTypes.string.isRequired,
//    textColor: PropTypes.string.isRequired,
// };