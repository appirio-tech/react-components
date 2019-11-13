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
            Hi <b>{vm.userHandle}</b>,
            <br />

            Welcome to Connect! Your account was created successfully.
            <br/><br/>

            <div className="intro-question">What is Connect?</div>
            <div>Connect is Topcoder's application where clients start new projects, oversee progress and collaborate with delivery teams.</div>

            <div className="intro-question">What do you want to do next in Connect?</div>
            <div>
              <ul className="getting-started-list">
                <li><a href={vm.connectDashboardUrl}>Join the projects</a> I've been invited to</li>
                <li><a href={vm.newProjectUrl}>Start a new project</a> myself</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WelcomeScreen
