import React from 'react'
import './SidebarRow.scss'

const { array } = React.PropTypes

const SidebarRow = (props) => (
  <div className="sidebar-row">
    {props.children}
  </div>
)

SidebarRow.defaultProps = {
  children: [],
}

SidebarRow.propTypes = {
  children: array,
}

export default SidebarRow
