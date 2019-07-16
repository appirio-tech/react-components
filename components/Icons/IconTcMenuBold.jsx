import React from 'react'
import PropTypes from 'prop-types'

const IconTcMenuBold = (props) => {
  const fill = props.fill || '#62AADC'
  const height = props.height || '16'
  const width = props.width || '16'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 16 16" aria-labelledby="title">
      <title id="title">IconTcMenuBold</title>
      <path fill={fill} d="M16 1a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V1zM16 7a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7zM16 13a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1z"/>
    </svg>
  )
}

IconTcMenuBold.propTypes = {
  fill   : PropTypes.string,
  stroke : PropTypes.string,
  height : PropTypes.number,
  width  : PropTypes.number
}

export default IconTcMenuBold


