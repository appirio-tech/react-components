import React from 'react'
// import Drawer from 'material-ui/Drawer'
import Drawer from './Drawer'
import Toolbar from '../Toolbar/Toolbar'
import ToolbarGroup from '../Toolbar/ToolbarGroup'
import ToolbarTitle from '../Toolbar/ToolbarTitle'
import CloseIcon from '../Icons/CloseIcon'
import './DrawerExamples.scss'

export default class DrawerExamples extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
  }

  toggleDrawer() {
    this.setState((prevState) => ({
      open: !prevState.open
    }))
  }

  closeDrawer() {
    this.setState({open: false})
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.toggleDrawer}>Open Drawer</button>
          <Drawer open={this.state.open} onRequestChange={this.closeDrawer} >
              <Toolbar>
                <ToolbarGroup>
                  <ToolbarTitle text="Project Scope" />
                </ToolbarGroup>
                <ToolbarGroup>
                  <span className="closeBtn" onClick={this.closeDrawer}>
                    <CloseIcon />
                  </span>
                </ToolbarGroup>
              </Toolbar>
              hello there nothing is ok
          </Drawer>
      </div>
    )
  }
}