import React from 'react'
import PropTypes from 'prop-types'

const IconUIBoldDelete = (props) => {
  const fill = props.fill || '#62AADC'
  const height = props.height || '16'
  const width = props.width || '16'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 16 16" aria-labelledby="title">
      <title id="title">IconUIBoldDelete</title>
        <path fill={fill} d="M0 6h16v4H0z"/>
    </svg>
  )
}

IconUIBoldDelete.propTypes = {
  fill   : PropTypes.string,
  stroke : PropTypes.string,
  height : PropTypes.number,
  width  : PropTypes.number
}

export default IconUIBoldDelete