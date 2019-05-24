import React from 'react'
import PropTypes from 'prop-types'

const IconArrowMinimalDown = (props) => {
  const fill = props.fill || '#62AADC'
  const height = props.height || '16'
  const width = props.width || '16'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 16 16" aria-labelledby="title">
      <title id="title">IconArrowMinimalDown</title>
	<path fill={fill} d="M15.707 4.854l-1.414-1.415L8 9.732 1.707 3.439.293 4.854 8 12.561z"/>
</svg>
  )
}

IconArrowMinimalDown.propTypes = {
  fill   : PropTypes.string,
  stroke : PropTypes.string,
  height : PropTypes.number,
  width  : PropTypes.number
}

export default IconArrowMinimalDown