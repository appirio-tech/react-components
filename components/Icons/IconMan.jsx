import React from 'react'

const IconMan = ({ fill, wrapperClass }) => {
  return (
    <svg className={wrapperClass} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <g className="nc-icon-wrapper" fill="#111111">
        <circle data-color="color-2" cx="5" cy="9" r="1">
        </circle>
        <circle data-color="color-2" cx="11" cy="9" r="1">
        </circle>
        <path fill={fill ? fill : '#111111'} d="M8,0C3.589,0,0,3.589,0,8s3.589,8,8,8s8-3.589,8-8S12.411,0,8,0z M8,14c-3.309,0-6-2.691-6-6 c0-0.563,0.083-1.105,0.229-1.622c2.092-0.878,5.097,0.717,8.317-2.196c1.131,1.79,2.471,2.571,3.379,2.914 C13.969,7.391,14,7.692,14,8C14,11.309,11.309,14,8,14z">
        </path>
      </g>
    </svg>
  )
}

export default IconMan
