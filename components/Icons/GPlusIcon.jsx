import React from 'react'

const GPlusIcon = ({ width, height }) => {

  const w = (width || 32) + 'px'
  const h = (height || 32) + 'px'
  let viewBox = '0 0'
  viewBox += ' ' + (width || 32)
  viewBox += ' ' + (height || 32)
  return (
    <svg width={ w } height={ h } viewBox={ viewBox } version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g id="Register-Web" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
        <g id="LogIn-W-Empty" transform="translate(-457.000000, -598.000000)">
          <g id="Log-In-Icons" transform="translate(362.000000, 585.984000)">
            <g id="button-bg-copy-+-super-g-+-GOOGLE" transform="translate(83.000000, 1.000000)">
              <g id="super-g" transform="translate(12.000000, 11.000000)">
                <path d="M9,3.48 C10.69,3.48 11.83,4.21 12.48,4.82 L15.02,2.34 C13.46,0.89 11.43,0 9,0 C5.48,0 2.44,2.02 0.96,4.96 L3.87,7.22 C4.6,5.05 6.62,3.48 9,3.48 L9,3.48 Z" id="Shape" fill="#EA4335"></path>
                <path d="M17.64,9.2 C17.64,8.46 17.58,7.92 17.45,7.36 L9,7.36 L9,10.7 L13.96,10.7 C13.86,11.53 13.32,12.78 12.12,13.62 L14.96,15.82 C16.66,14.25 17.64,11.94 17.64,9.2 L17.64,9.2 Z" id="Shape" fill="#4285F4"></path>
                <path d="M3.88,10.78 C3.69,10.22 3.58,9.62 3.58,9 C3.58,8.38 3.69,7.78 3.87,7.22 L0.96,4.96 C0.35,6.18 0,7.55 0,9 C0,10.45 0.35,11.82 0.96,13.04 L3.88,10.78 L3.88,10.78 Z" id="Shape" fill="#FBBC05"></path>
                <path d="M9,18 C11.43,18 13.47,17.2 14.96,15.82 L12.12,13.62 C11.36,14.15 10.34,14.52 9,14.52 C6.62,14.52 4.6,12.95 3.88,10.78 L0.97,13.04 C2.45,15.98 5.48,18 9,18 L9,18 Z" id="Shape" fill="#34A853"></path>
                <path d="M0,0 L18,0 L18,18 L0,18 L0,0 Z" id="Shape"></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default GPlusIcon
