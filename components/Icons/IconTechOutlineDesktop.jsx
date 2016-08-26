import React from 'react'

const IconTechOutlineDesktop = (props) => {
  const fill = props.fill || '#62AADC'
  const height = props.height || '48'
  const width = props.width || '48'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 48 48" aria-labelledby="title">
      <title id="title">IconTechOutlineDesktop</title>
        <path fill={fill} d="M42 1H6C3.2 1 1 3.2 1 6v28c0 2.8 2.2 5 5 5h11v6h-5c-.6 0-1 .4-1 1s.4 1 1 1h24c.6 0 1-.4 1-1s-.4-1-1-1h-5v-6h11c2.8 0 5-2.2 5-5V6c0-2.8-2.2-5-5-5zM6 3h36c1.7 0 3 1.3 3 3v23H3V6c0-1.7 1.3-3 3-3zm23 42H19v-6h10v6zm13-8H6c-1.7 0-3-1.3-3-3v-3h42v3c0 1.7-1.3 3-3 3z"/><path d="M22 9h4c.6 0 1-.4 1-1s-.4-1-1-1h-4c-.6 0-1 .4-1 1s.4 1 1 1z"/>
      </svg>
  )
}

IconTechOutlineDesktop.propTypes = {
  fill   : React.PropTypes.string,
  stroke : React.PropTypes.string,
  height : React.PropTypes.number,
  width  : React.PropTypes.number
}

export default IconTechOutlineDesktop