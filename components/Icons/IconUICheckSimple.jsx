import React from 'react'
import PropTypes from 'prop-types'

const IconUICheckSimple = (props) => {
  const fill = props.fill || '#62AADC'
  const height = props.height || '16'
  const width = props.width || '16'

  return (
    <svg className={props.wrapperClass} xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 16 16" aria-labelledby="title">
      <title id="title">IconUICheckSimple</title>
        <path fill={fill} d="M5.6 9.6L2.4 6.4 0 8.8l5.6 5.6L16 4l-2.4-2.4z"/>
    </svg>
  )
}

IconUICheckSimple.propTypes = {
  fill   : PropTypes.string,
  stroke : PropTypes.string,
  height : PropTypes.number,
  width  : PropTypes.number,
  wrapperClass: PropTypes.string
}

export default IconUICheckSimple