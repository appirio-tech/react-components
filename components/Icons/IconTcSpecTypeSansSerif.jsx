import React from 'react'

const IconTcSpecTypeSansSerif = (props) => {
  const fill = props.fill || '#62AADC'
  const height = props.height || '64'
  const width = props.width || '64'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox="0 0 64 64" aria-labelledby="title">
      <title id="title">IconTcSpecTypeSansSerif</title>
      <path fill={fill} fillRule="evenodd" d="M25.071 42.223H12.23l-2.44 7.324H2L15.232 14h6.788l13.305 35.547h-7.788l-2.466-7.324zM14.207 36.29h8.887l-4.468-13.306-4.419 13.306zm39.282 13.257c-.325-.635-.561-1.424-.708-2.368-1.709 1.904-3.93 2.856-6.665 2.856-2.588 0-4.732-.749-6.433-2.246-1.7-1.497-2.551-3.385-2.551-5.664 0-2.8 1.037-4.948 3.113-6.445 2.075-1.498 5.074-2.255 8.996-2.27h3.247v-1.514c0-1.221-.313-2.198-.94-2.93-.626-.733-1.615-1.099-2.966-1.099-1.188 0-2.12.285-2.795.855-.676.57-1.014 1.35-1.014 2.343h-7.055c0-1.53.472-2.946 1.416-4.248s2.278-2.323 4.004-3.064c1.725-.74 3.662-1.11 5.81-1.11 3.255 0 5.84.817 7.752 2.453s2.868 3.935 2.868 6.897v11.45c.017 2.507.367 4.403 1.05 5.689v.415H53.49zm-5.835-4.907a6.077 6.077 0 0 0 2.881-.696c.88-.464 1.53-1.087 1.953-1.868v-4.54h-2.636c-3.532 0-5.412 1.22-5.64 3.661l-.025.415c0 .88.31 1.603.928 2.173.619.57 1.465.855 2.54.855z"/>
    </svg>
  )
}

IconTcSpecTypeSansSerif.propTypes = {
  fill   : React.PropTypes.string,
  stroke : React.PropTypes.string,
  height : React.PropTypes.number,
  width  : React.PropTypes.number
}

export default IconTcSpecTypeSansSerif