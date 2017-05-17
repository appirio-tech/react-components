import React from 'react'

const LeftArrowIcon = ({ width, height, fill }) => {
  const f = (fill || '#A3A3AE')
  return (
    <svg width={ width || '12px' } height={ height || '19px' } viewBox="0 0 12 19" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>ico-arrow-big-left</title>
      <desc>Created with Sketch.</desc>
      <defs />
      <g id="ASSETS-EXPORT" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
        <g id="Assets" transform="translate(-950.000000, -252.000000)" fill={ f }>
            <path d="M959.025853,261.50145 L951.137711,253.305117 C950.841671,253.006868 950.841671,252.524146 951.137711,252.223687 C951.433751,251.925438 951.912055,251.925438 952.208095,252.223687 L960.857325,260.959078 C961.153365,261.258432 961.153365,261.742258 960.857325,262.040508 L952.208095,270.775899 C951.912055,271.075253 951.433751,271.074148 951.137711,270.775899 C950.841671,270.478754 950.841671,269.994927 951.137711,269.694469 L959.025853,261.50145 L959.025853,261.50145 Z" id="ico-arrow-big-left" transform="translate(955.997518, 261.500000) scale(-1, 1) translate(-955.997518, -261.500000) " />
        </g>
      </g>
    </svg>
  )
}

export default LeftArrowIcon
