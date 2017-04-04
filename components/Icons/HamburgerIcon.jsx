import React from 'react'

const HamburgerIcon = ({ width, height, stroke }) => {
  const s = (stroke || '#A3A3AE')
  return (
    <svg width={ width || '22px' } height={ height || '16px' } viewBox="0 0 22 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>ico-hamburger</title>
      <desc>Created with Sketch.</desc>
      <defs />
      <g id="Scaling" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <g id="Components---Mobile" transform="translate(-1379.000000, -434.000000)" stroke={ s } strokeWidth="2">
            <g id="ico-mobile-menu-default" transform="translate(1380.000000, 434.000000)">
                <path d="M0,8 L20,8" id="Stroke-5456" />
                <path d="M0,1 L20,1" id="Stroke-5460" />
                <path d="M0,15 L20,15" id="Stroke-5461" />
            </g>
        </g>
      </g>
    </svg>
  )
}

export default HamburgerIcon
