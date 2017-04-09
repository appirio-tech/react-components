import React from 'react'
import UserDropdownMenu from './UserDropdownMenu'

const UserDropdownMenuExamples = () => {
  return (
    <div>
      <p>Logged In state</p>
      <UserDropdownMenu username="vic-tor" userImage="https://topcoder-prod-media.s3.amazonaws.com/member/profile/vic-tor-1446848838388.jpeg" domain={`${process.env.domain}`} />
      <p>Logged Out state</p>
      <UserDropdownMenu domain={`${process.env.domain}`} />
    </div>
  )
}

module.exports = UserDropdownMenuExamples
