import React from 'react'

const PlaceholderIcon = ({ width, height, fill }) => {
  const f = (fill || '#B47DD6')
  return (
    <svg width={ width || '32px' } height={ height || '32px' } viewBox="0 0 32 32">
      <rect width="32" height="32" fill={ f }></rect>
    </svg>
  )
}

export default PlaceholderIcon