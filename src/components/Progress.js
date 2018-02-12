import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Progress extends Component {

   constructor(props) {
       super(props)
   }

   renderProgress () {
        const progressItemStyle1 = {
            height: '100%',
            width: `${this.props.index / this.props.nums * 100}%`,
            backgroundColor: this.props.progressColor,
        }
        const progressItemStyle2 = {
            height: '100%',
            width: `${(1 - this.props.index / this.props.nums) * 100}%`,
            backgroundColor: this.props.backColor
        }
        return [
            <div style={progressItemStyle1} key={'progressBlock1'}></div>,
            <div style={progressItemStyle2} key={'progressBlock2'}></div>
        ]
   }

   render() {

       const progressArticleStyle = {
            height: 10,
            border: `1px solid ${this.props.backColor}`,
            width: '75%',
            display: '-webkit-flex',
            borderRadius: 2,
            overflow: 'hidden',
            marginTop: 3
        };

       return (
           <div style={{display: '-webkit-flex'}}>
               <div style={progressArticleStyle}>
                   {this.renderProgress()}
               </div>
               <div style={{width: '25%', marginLeft: '3px', color: this.props.textColor}}>
                   {this.props.index}/{this.props.nums}
               </div>
           </div>
       )
   }
}

Progress.propTypes = {
   nums: PropTypes.number.isRequired,
   index: PropTypes.number.isRequired,
   progressColor: PropTypes.string.isRequired,
   backColor: PropTypes.string.isRequired,
   textColor: PropTypes.string.isRequired,
};