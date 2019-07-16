import React from 'react'
import PropTypes from 'prop-types'

const IconArrowTailRight = (props) => {
  const fill = props.fill || '#62AADC'
  const height = props.height || '16'
  const width = props.width || '16'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 16 16" aria-labelledby="title">
      <title id="title">IconArrowTailRight</title>
      <path fill={fill} d="M7.879 2.707L12.172 7H0v2h12.172l-4.293 4.293 1.414 1.414L16 8 9.293 1.293z"/>
    </svg>
  )
}

IconArrowTailRight.propTypes = {
  fill   : PropTypes.string,
  stroke : PropTypes.string,
  height : PropTypes.number,
  width  : PropTypes.number
}

export default IconArrowTailRight