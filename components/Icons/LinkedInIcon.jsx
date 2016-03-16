import React from 'react'

const LinkedInIcon = ({ width, height, fill }) => {

  const w = (width || 32) + 'px'
  const h = (height || 32) + 'px'
  const f = (fill || '#007BB5')
  let viewBox = '0 0'
  viewBox += ' ' + (width || 32)
  viewBox += ' ' + (height || 32)
  return (
    <svg width={ w } height={ h } viewBox={ viewBox } version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect fill={ f } height="23" width="7" y="9"/>
        <path d="M24.003,9C20,9,18.89,10.312,18,12V9h-7v23h7V19c0-2,0-4,3.5-4s3.5,2,3.5,4v13h7V19C32,13,31,9,24.003,9z" fill={ f }/>
        <circle cx="3.5" cy="3.5" fill={ f } r="3.5"/>
      </g>
      <g/>
      <g/>
      <g/>
      <g/>
      <g/>
      <g/>
    </svg>
  )
}

export default LinkedInIcon
