import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Progress extends Component {

   constructor(props) {
       super(props)
   }

   renderProgress () {
        const progressItemStyle = {
            height: '100%'
        };
        const ele = [];
        const width1 = `${this.props.index / this.props.nums * 100}%`
        const width2 = `${(1 - this.props.index / this.props.nums) * 100}%`
        progressItemStyle.width = width1
        ele.push(
            <div style={Object.assign({backgroundColor: this.props.progressColor}, progressItemStyle)} key={'progressBlock1'}></div>
        )
        progressItemStyle.width = width2
        ele.push(
            <div style={progressItemStyle} key={'progressBlock2'}></div>
        )
        return ele;
   }

   render() {

       const progressStyle = {
           display: '-webkit-flex',
           color: this.props.progressColor,
       };

       const progressArticleStyle = {
           height: 10,
           border: '1px solid #dabb84',
           width: '75%',
           display: '-webkit-flex',
           borderRadius: 2,
           overflow: 'hidden',
           marginTop: 3
       };

       return (
           <div style={progressStyle}>
               <div style={progressArticleStyle}>
                   {this.renderProgress()}
               </div>
               <div style={{width: '25%', marginLeft: '3px'}}>
                   {this.props.index}/{this.props.nums}
               </div>
               
           </div>
       )
   }
}

Progress.propTypes = {
   nums: PropTypes.number.isRequired,
   index: PropTypes.number.isRequired,
   progressColor: PropTypes.string.isRequired
};