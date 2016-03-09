import { PropTypes, Component } from 'react'

require('./StandardListItemStyles.scss')
var React = require('react');
 // hideIcon: true -> don't render the icon
 // hideLabel: true -> don't render the label
 // imgSrc: source for the icon
 // labelText: The text for the label
 // placeIcon: defines the position of the icon. Either: top | left | right.  Default to top

// StandardListItem = ({hideIcon, hideLabel, imgSrc, labelText, placeIcon = 'top'}) ->
//
  // classes = "StandardListItem " + placeIcon
  //
  // <div className={classes}>
  //   {
  //     if !hideLabel
  //       <p className="label">{labelText}</p>
  //   }
  //   {
  //     if !hideIcon
  //       <img className="icon" src={imgSrc} />
  //   }
  //
  // </div>
//
// module.exports = StandardListItem

class StandardListItem extends Component {
  constructor(props) {
   super(props)
   this.placeIcon = (this.props.placeIcon && this.props.placeIcon != '') ? this.props.placeIcon : 'top';
  }
  render() {
    var classes = "StandardListItem " + this.placeIcon
    var label;
    var icon;

    if (!this.props.hideLabel){
      label = <p className='label'>{this.props.labelText}</p>;
    }

    if (!this.props.hideIcon){
      icon = <img className="icon" src={this.props.imgSrc}/>;
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
