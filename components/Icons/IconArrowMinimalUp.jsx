import React from 'react'
import PropTypes from 'prop-types'

const IconArrowMinimalUp = (props) => {
  const fill = props.fill || '#62AADC'
  const height = props.height || '16'
  const width = props.width || '16'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 16 16" aria-labelledby="title">
      <title id="title">IconArrowMinimalUp</title><path fill={fill} d="M8 3.439L.293 11.146l1.414 1.415L8 6.268l6.293 6.293 1.414-1.415z"/></svg>
  )
}

IconArrowMinimalUp.propTypes = {
  fill   : PropTypes.string,
  stroke : PropTypes.string,
  height : PropTypes.number,
  width  : PropTypes.number
}

export default IconArrowMinimalUp