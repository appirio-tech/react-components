import React from 'react'
import PropTypes from 'prop-types'

const IconUIChat = (props) => {
  const fill = props.fill || '#62AADC'
  const height = props.height || '16'
  const width = props.width || '16'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 16 16" aria-labelledby="title">
      <title id="title">IconUIChat</title>
        <path fill={fill} d="M15 0H1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h3.586l2.707 2.707a.997.997 0 0 0 1.414 0L11.414 13H15a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z"/>
    </svg>
  )
}

IconUIChat.propTypes = {
  fill   : PropTypes.string,
  stroke : PropTypes.string,
  height : PropTypes.number,
  width  : PropTypes.number
}

export default IconUIChat