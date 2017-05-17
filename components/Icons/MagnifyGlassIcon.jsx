import React from 'react'

const MagnifyGlassIcon = ({ width, height, stroke }) => {
  const s = (stroke || '#A3A3AE')
  return (
    <svg width={ width || '22px' } height={ height || '22px' } viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>ico-magnify</title>
      <defs />
      <g id="Scaling" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <g id="Components---Mobile" transform="translate(-1327.000000, -432.000000)" stroke={ s } strokeWidth="2">
            <g id="ico-mobile-search-default" transform="translate(1328.000000, 433.000000)">
                <path d="M20,20 L14.632381,14.632381" id="Stroke-5191" />
                <path d="M0,8.57142857 C0,3.83714286 3.83714286,0 8.57142857,0 C13.3057143,0 17.1428571,3.83714286 17.1428571,8.57142857 C17.1428571,13.3057143 13.3057143,17.1428571 8.57142857,17.1428571 C3.83714286,17.1428571 0,13.3057143 0,8.57142857 L0,8.57142857 Z" id="Stroke-5192" />
            </g>
        </g>
      </g>
    </svg>
  )
}

export default MagnifyGlassIcon
