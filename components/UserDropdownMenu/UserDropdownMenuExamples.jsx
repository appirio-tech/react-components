import React from 'react'
import UserDropdownMenu from './UserDropdownMenu'

const UserDropdownMenuExamples = () => {

  let userMenuItems =[
    [
      {label: 'My profile', link: '/settings/profile'},
      {label: 'Account and security', link: '/settings/account'},
      {label: 'Notification settings', link: '/settings/notifications'}
    ],
    [{label: 'Log out', absolute: true, id: 0, onClick: () => {console.log('logout')}}]
  ] 
  return (
    <div>
        <p>Logged In state</p>
        <UserDropdownMenu
          userName={ "vic-tor" }
          userHandle={'dan_developer'}
          userImage={'https://topcoder-prod-media.s3.amazonaws.com/member/profile/vic-tor-1446848838388.jpeg'}
          domain={ 'topcoder-dev.com'}
          menuItems={ userMenuItems }
          loginUrl={ "https://accounts.topcoder-dev.com/#!/connect?retUrl=http://local.topcoder-dev.com:3000/"}
          registerUrl={ "https://accounts.topcoder-dev.com/#!/connect?retUrl=http://local.topcoder-dev.com:3000/"}
          forReactRouter
        />

      <p>Logged Out state</p>
      <UserDropdownMenu domain="topcoder-dev.com" />
    </div>
  )
}

module.exports = UserDropdownMenuExamples
