import React from 'react'

require('./SidebarRow.scss')

const SidebarRow = (props) => {
  return (
    <div className="sidebar-row">
      {props.children}
    </div>
  )
}

export default SidebarRow