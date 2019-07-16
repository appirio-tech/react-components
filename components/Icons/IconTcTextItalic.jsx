import React from 'react'
import PropTypes from 'prop-types'

const IconTcTextItalic = (props) => {
  const fill = props.fill || '#62AADC'
  const height = props.height || '16'
  const width = props.width || '16'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 16 16" aria-labelledby="title">
      <title id="title">IconTcTextItalic</title>
      <path fill={fill} fillRule="evenodd" d="M5 12.891h5.148l.061-.817-1.439-.244 1.413-10.735 1.412-.21.096-.885H6.69l-.104.885 1.213.21L6.387 11.83l-1.292.253z"/>
    </svg>
  )
}

IconTcTextItalic.propTypes = {
  fill   : PropTypes.string,
  stroke : PropTypes.string,
  height : PropTypes.number,
  width  : PropTypes.number
}

export default IconTcTextItalic