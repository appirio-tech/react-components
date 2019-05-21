import React from 'react'
import PropTypes from 'prop-types'

const IconUsersSingle = (props) => {
  const fill = props.fill || '#62AADC'
  const height = props.height || '16'
  const width = props.width || '16'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 16 16" aria-labelledby="title">
      <title id="title">IconUsersSingle</title>
        <path fill={fill} d="M8 9C5.8 9 4 7.2 4 5V4c0-2.2 1.8-4 4-4s4 1.8 4 4v1c0 2.2-1.8 4-4 4z"/>
        <path fill={fill} d="M10 11H6c-2.8 0-5 2.2-5 5h14c0-2.8-2.2-5-5-5z"/>
    </svg>
  )
}

IconUsersSingle.propTypes = {
  fill   : PropTypes.string,
  stroke : PropTypes.string,
  height : PropTypes.number,
  width  : PropTypes.number
}

export default IconUsersSingle