import React from 'react'

const tcCarretDown = ({ width, height, fill }) => {
  const f = (fill || '#62AADC')
  const h = (height || '6')
  const w = (width || '10')
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={ h } width={ w } viewBox={ 0 0 { h } { w } } aria-labelledby="title">
      <title>tc-carret-down</title>
      <path fill={ f } fill-rule="evenodd" d="M162.4782 192.1933c.3036.271.7623.271 1.066 0l4.478-4L166.9566 187l-3.9404 3.5284-3.95-3.5284-1.066 1.1933 4.4782 4z"/>
    </svg>
  )
}

export default tcCarretDown