import React from 'react'
import UserDropdownMenu from './UserDropdownMenu'

const UserDropdownMenuExamples = () => {
  return (
    <div>
      <p>Logged In state</p>
      <UserDropdownMenu username="vic-tor" domain="topcoder-dev.com" />
      <p>Logged Out state</p>
      <UserDropdownMenu domain="topcoder-dev.com" />
    </div>
  )
}

module.exports = UserDropdownMenuExamples
