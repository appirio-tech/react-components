import React from 'react'
import PropTypes from 'prop-types'

const IconUIBoldAdd = (props) => {
  const height = props.height || '16'
  const width = props.width || '16'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 16 16" aria-labelledby="title">
      <title id="title">IconUIBoldAdd</title>
        <path d="M10 0H6v6H0v4h6v6h4v-6h6V6h-6z"/>
    </svg>
  )
}

IconUIBoldAdd.propTypes = {
  fill   : PropTypes.string,
  stroke : PropTypes.string,
  height : PropTypes.number,
  width  : PropTypes.number
}

export default IconUIBoldAdd