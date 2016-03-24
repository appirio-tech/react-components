import React from 'react'

const RightArrowIcon = ({ width, height, fill }) => {
  const f = (fill || '#A3A3AE')
  return (
    <svg width={ width || '12px' } height={ height || '19px' } viewBox="0 0 12 19" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>ico-arrow-big-right</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g id="Assets" transform="translate(-929.000000, -252.000000)" fill={ f }>
        <path d="M938.025853,261.50145 L930.137711,253.305117 C929.841671,253.006868 929.841671,252.524146 930.137711,252.223687 C930.433751,251.925438 930.912055,251.925438 931.208095,252.223687 L939.857325,260.959078 C940.153365,261.258432 940.153365,261.742258 939.857325,262.040508 L931.208095,270.775899 C930.912055,271.075253 930.433751,271.074148 930.137711,270.775899 C929.841671,270.478754 929.841671,269.994927 930.137711,269.694469 L938.025853,261.50145 L938.025853,261.50145 Z" id="ico-arrow-big-right"></path>
      </g>
    </svg>
  )
}

export default RightArrowIcon
