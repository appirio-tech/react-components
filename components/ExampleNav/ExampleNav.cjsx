'use strict'

require './ExampleNavStyle'

React      = require 'react'
classNames = require 'classnames'

{ Link } = require 'react-router'

component = ({ links, onClick, onBack }) ->
  <ul className="ExampleNav">
    {
      if onBack
        <li>
          <a onClick={onBack} className="back">&#8604; back</a>
        </li>
    }
    {
      links?.map (link, i) ->
        <li key={i}>
          {
            if onClick
              <a onClick={-> onClick(link)}>{link}</a>
            else
              <Link to={link}>{link}</Link>
          }
        </li>
    }
  </ul>

module.exports = component

