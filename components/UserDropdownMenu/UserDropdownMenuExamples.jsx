import React from 'react'
import UserDropdownMenu from './UserDropdownMenu'

const UserDropdownMenuExamples = () => {
  return (
    <div>
      <p>Logged In state</p>
      <UserDropdownMenu username="vic-tor" />
      <p>Logged Out state</p>
      <UserDropdownMenu />
    </div>
  )
}

module.exports = UserDropdownMenuExamples
