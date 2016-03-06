'use strict'

require './StandardListItemStyles'

React  = require 'react'

# hideIcon: true -> don't render the icon
# hideLabel: true -> don't render the label
# imgSrc: source for the icon
# labelText: The text for the label
# placeIcon: defines the position of the icon. Either: top | left | right.  Default to top

StandardListItem = ({hideIcon, hideLabel, imgSrc, labelText, placeIcon = 'top'}) ->

  classes = "StandardListItem " + placeIcon

  <div className={classes}>
    {
      if !hideLabel
        <p className="label">{labelText}</p>
    }
    {
      if !hideIcon
        <img className="icon" src={imgSrc} />
    }

  </div>

module.exports = StandardListItem
