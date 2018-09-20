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
          <div className="sub-title">The world’s biggest crowdsorginc platform</div>
          <div className="content">
          Hello, <b>Victor Tian!</b>
          <br />
          <br />
          Your Topcoder account was successfully created. On the next screen let’s figure out which solution best fits your needs.
          </div>
          <a href={vm.newProjectUrl} type="button" className="next-btn tc-btn tc-btn-sm tc-btn-primary flex middle center" disabled={!vm.isLoggedIn}>Select your solution</a>
        </div>
      </div>
    )
  }
}

export default WelcomeScreen
