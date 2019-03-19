import React from 'react'

const XMarkIcon = ({ width, height }) => {
  return (
    <div className="x-mark-icon">
      <svg width={ width || '14px'} height={ height || '14px'} viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <title>x-mark</title>
        <desc>X Mark</desc>
        <defs></defs>
        <g id="x-mark-icon" strokeWidth="1" fillRule="evenodd">
          <g id="x-mark-icon" transform="translate(-382.000000, -806.000000)">
            <polygon id="x-mark" points="393.140845 806 389 810.239437 384.859155 806 382 808.859155 386.239437 813 382 817.140845 384.859155 820 389 815.760563 393.140845 820 396 817.140845 391.760563 813 396 808.859155"></polygon>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default XMarkIcon
