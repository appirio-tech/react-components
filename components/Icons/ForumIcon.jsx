import React from 'react'

const ForumIcon = ({ width, height, fill }) => {
  const f = (fill || '#C3C3C8')
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={ width || '16' } height={ height || '16' } viewBox="0 0 16 16" xmlns="http://www.w3.org/1999/xlink">
      <defs>
        <path id="a" d="M15,0 L1,0 C0.4,0 0,0.4 0,1 L0,12 C0,12.6 0.4,13 1,13 L4.6,13 L7.3,15.7 C7.5,15.9 7.7,16 8,16 C8.3,16 8.5,15.9 8.7,15.7 L11.4,13 L15,13 C15.6,13 16,12.6 16,12 L16,1 C16,0.4 15.6,0 15,0 L15,0 Z"/>
        <mask id="b" width={ width || '16' } height={ width || '16' } x="0" y="0" fill="white">
          <use href="#a"/>
        </mask>
      </defs>
      <g fill="none" fill-rule="evenodd">
        <use fill="#FFFFFF" stroke={ f } strokeWidth="4" mask="url(#b)" href="#a"/>
        <rect width="8" height="2" x="4" y="4" fill={ f }/>
        <rect width="4" height="2" x="4" y="7" fill={ f }/>
      </g>
    </svg>

  )
}

export default ForumIcon
