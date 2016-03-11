import {PropTypes, Component } from 'react'
import React from 'react'

require('./StandardListItemStyles.scss')
 // showIcon: true -> render the icon
 // showLabel: true -> render the label
 // imgSrc: source for the icon
 // labelText: The text for the label
 // placeIcon: defines the position of the icon. Either: top | left | right.  Default to top

class StandardListItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const classes = 'StandardListItem ' + this.props.placeIcon
    let label
    let icon

    if (this.props.showLabel){
      label = <p className="label">{this.props.labelText}</p>
    }

    if (this.props.showIcon){
      icon = <img className="icon" src={this.props.imgSrc}/>
    }

    return (<div className={classes}>{label}{icon}</div>)
  }
}

StandardListItem.propTypes = {
  showIcon : PropTypes.bool,
  showLabel : PropTypes.bool,
  imgSrc : PropTypes.string,
  labelText : PropTypes.string,
  placeIcon : PropTypes.string
}

StandardListItem.defaultProps = {
  showIcon: true,
  showLabel: true,
  placeIcon: 'top'
}

export default StandardListItem
