import React from 'react'

require('./Avatar.scss');

const Avatar = ({ avatarUrl }) => {

  const src = avatarUrl || require('./place-holder.svg');

  return (
    <div className="Avatar">
      <img src={src}/>
    </div>
  )
}

export default Avatar;
