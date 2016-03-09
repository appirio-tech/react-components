import { PropTypes, Component } from 'react'

require('./StandardListItemStyles.scss')
let React = require('react');
 // hideIcon: true -> don't render the icon
 // hideLabel: true -> don't render the label
 // imgSrc: source for the icon
 // labelText: The text for the label
 // placeIcon: defines the position of the icon. Either: top | left | right.  Default to top

class StandardListItem extends Component {
  constructor(props) {
   super(props)
   this.placeIcon = (this.props.placeIcon && this.props.placeIcon !== '') ? this.props.placeIcon : 'top'
  }
  render() {
    let classes = 'StandardListItem ' + this.placeIcon
    let label;
    let icon;

    if (!this.props.hideLabel){
      label = <p className='label'>{this.props.labelText}</p>;
    }

    if (!this.props.hideIcon){
      icon = <img className='icon' src={this.props.imgSrc}/>;
    }

    return (
      <div className={classes}>
         {label}
         {icon}
      </div>
    )
  }
}

StandardListItem.propTypes = {
  hideIcon : PropTypes.bool,
  hideLabel : PropTypes.bool,
  imgSrc : PropTypes.string,
  labelText : PropTypes.string,
  placeIcon : PropTypes.string
}

export default StandardListItem
