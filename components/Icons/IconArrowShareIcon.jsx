import React from 'react'
import PropTypes from 'prop-types'

const IconArrowShareIcon = (props) => {
  const fill = props.fill || '#62AADC'
  const height = props.height || '16'
  const width = props.width || '16'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 16 16" aria-labelledby="title">
      <title id="title">IconArrowShareIcon</title>
      <path fill={fill} d="M9 11V4h2.414L8 0 4.586 4H7v7z"/>
      <path fill={fill} d="M15 5h-3v2h2v7H2V7h2V5H1a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z"/>
    </svg>
  )
}

IconArrowShareIcon.propTypes = {
  fill   : PropTypes.string,
  stroke : PropTypes.string,
  height : PropTypes.number,
  width  : PropTypes.number
}

export default IconArrowShareIcon