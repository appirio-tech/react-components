'use strict'

require './Avatar.scss'

React  = require 'react'

Avatar = ({avatarUrl}) ->
  src = avatarUrl || require './place-holder.svg'

  <div className="Avatar">
    <img src={src}/>
  </div>

module.exports = Avatar
