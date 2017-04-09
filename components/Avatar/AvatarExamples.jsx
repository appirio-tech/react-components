import React from 'react'
import Avatar from './Avatar.jsx'

const AvatarExamples = () => (
  <div className="AvatarExamples flex column middle center">
    <h1>Default</h1>

    <Avatar />

    <h1>Url is provided</h1>

    <Avatar avatarUrl={`${process.env.MAIN_URL}/i/m/cardiboy_big.jpg`} />
  </div>
)

export default AvatarExamples
