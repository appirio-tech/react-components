import React from 'react'

const IconUIPencil = (props) => {
  const fill = props.fill || '#62AADC'
  const height = props.height || '16'
  const width = props.width || '16'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 16 16" aria-labelledby="title">
      <title id="title">IconUIPencil</title>
        <path fill={fill} d="M11.707.293a.999.999 0 0 0-1.414 0l-10 10A.996.996 0 0 0 0 11v4a1 1 0 0 0 1 1h4c.266 0 .52-.105.707-.293l10-10a.999.999 0 0 0 0-1.414l-4-4zM4.586 14H2v-2.586l6-6L10.586 8l-6 6zM12 6.586L9.414 4 11 2.414 13.586 5 12 6.586z"/>
    </svg>
  )
}

IconUIPencil.propTypes = {
  fill   : React.PropTypes.string,
  stroke : React.PropTypes.string,
  height : React.PropTypes.number,
  width  : React.PropTypes.number
}

export default IconUIPencil