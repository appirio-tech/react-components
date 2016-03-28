import Navbar from './Navbar'
import React from 'react'

const NavbarExample = () => (
  <div>
    <p>Logged In Example</p>
  	<Navbar username="vic-tor" domain="topcoder-dev.com" />
    <p>Non Logged In Example</p>
    <Navbar domain="topcoder-dev.com" />
  </div>
)

module.exports = NavbarExample
