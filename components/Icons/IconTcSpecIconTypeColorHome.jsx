import React from 'react'

const IconTcSpecIconTypeColorHome = (props) => {
  const height = props.height || '46'
  const width = props.width || '44'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 46 44" aria-labelledby="title">
      <title id="title">IconTcSpecIconTypeColorHome</title>
        <path fill="#F22F24" d="M7 16V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6.09L7 16z"/>
        <path fill="#FEE3D0" d="M23 1L6 16.111V42a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V16.11L23 1z"/>
        <path fill="#FF5B52" d="M45 22a.999.999 0 0 1-.673-.26L23 2.35 1.673 21.74a1 1 0 1 1-1.346-1.48l22-20a1.003 1.003 0 0 1 1.346 0l22 20A1 1 0 0 1 45 22z"/>
        <path fill="#BD731E" d="M27 31h-8a1 1 0 0 0-1 1v12h10V32a1 1 0 0 0-1-1z"/>
        <path fill="#26ADE9" d="M27 25h-8a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z"/>
      </svg>
  )
}

IconTcSpecIconTypeColorHome.propTypes = {
  height : React.PropTypes.number,
  width  : React.PropTypes.number
}

export default IconTcSpecIconTypeColorHome