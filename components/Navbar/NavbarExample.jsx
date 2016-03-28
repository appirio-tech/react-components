import Navbar from './Navbar'
import React from 'react'

const NavbarExample = () => (
  <div>
    <p>Logged In Example</p>
  	<Navbar username="vic-tor" />
    <p>Non Logged In Example</p>
    <Navbar />
  </div>
)

module.exports = NavbarExample
