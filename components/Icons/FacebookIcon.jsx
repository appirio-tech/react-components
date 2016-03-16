import React from 'react'

const FacebookIcon = ({ width, height, fill }) => {

  const w = (width || 32) + 'px';
  const h = (height || 32) + 'px';
  const f = (fill || '#3B5998');
  let viewBox = '0 0';
  viewBox += ' ' + (width || 32);
  viewBox += ' ' + (height || 32);
  return (
    <svg width={ w } height={ h } viewBox={ viewBox } version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>ico-facebook</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g id="navigation-states" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
        <g id="Mobile-320-menu-speck-10" transform="translate(-60.000000, -1252.000000)" fill={ f }>
          <g id="©-2015-topcoder.-All-Copy-+-Group" transform="translate(20.000000, 1212.000000)">
            <g id="Group">
              <g id="facebook-copy" transform="translate(40.000000, 40.000000)">
                  <path d="M24,0 L3,0 C1.35,0 0,1.35 0,3 L0,24 C0,25.6515 1.35,27 3,27 L13.5,27 L13.5,16.5 L10.5,16.5 L10.5,12.7875 L13.5,12.7875 L13.5,9.7125 C13.5,6.4665 15.318,4.1865 19.149,4.1865 L21.8535,4.1895 L21.8535,8.097 L20.058,8.097 C18.567,8.097 18,9.216 18,10.254 L18,12.789 L21.852,12.789 L21,16.5 L18,16.5 L18,27 L24,27 C25.65,27 27,25.6515 27,24 L27,3 C27,1.35 25.65,0 24,0 L24,0 Z" id="ico-facebook"></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default FacebookIcon
