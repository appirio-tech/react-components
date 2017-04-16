import React from 'react'
import UserDropdownMenu from './UserDropdownMenu'

const UserDropdownMenuExamples = ({domain}) => {
  return (
    <div>
      <p>Logged In state</p>
      <UserDropdownMenu username="vic-tor" userImage="https://topcoder-prod-media.s3.amazonaws.com/member/profile/vic-tor-1446848838388.jpeg" domain={domain} />
      <p>Logged Out state</p>
      <UserDropdownMenu domain={domain} />
    </div>
  )
}

UserDropdownMenuExamples.defaultProps = {
  domain: process.env.domain,
}

UserDropdownMenuExamples.propTypes = {
  domain: React.PropTypes.string
}

module.exports = UserDropdownMenuExamples
