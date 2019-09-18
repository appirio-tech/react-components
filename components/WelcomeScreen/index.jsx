import React from 'react'

require('./style.scss')

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.reRender = this.reRender.bind(this)
    props.vm.reRender = this.reRender
  }

  reRender() {
    this.setState({update: true})
  }

  render() {
    const {vm} = this.props
    return (
      <div className="WelcomeScreen flex column middle center">
        <div className="container flex column middle center">
          <div className="title">Welcome to Topcoder</div>
          <div className="sub-title">The world’s largest crowdsourcing platform</div>
          <div className="content">
          Hello, <b>{vm.userHandle}</b>
          <br />
          <br />
          Your Topcoder account was successfully created. On the catalog let’s figure out which solution best fits your needs.
          </div>
          <a href={vm.newProjectUrl} type="button" className="next-btn tc-btn tc-btn-sm tc-btn-primary flex middle center">Review Catalog</a>
          <div className="next-btn flex center middle">or go to&nbsp;<a href={vm.connectDashboardUrl} type="button" className="tc-link ">Dashboard</a></div>
        </div>
      </div>
    )
  }
}

export default WelcomeScreen
