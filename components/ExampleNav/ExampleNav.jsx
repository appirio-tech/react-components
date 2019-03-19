import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

require('./ExampleNavStyle.scss')

const ExampleNav = ({ links, onClick, onBack }) => {
  const backLink = onBack && (
    <li>
      <a onClick={onBack} className="back">&#8604; back</a>
    </li>
  )


  const link = (link, i) => {
    const handleClick = () => {
      onClick(link)
    }

    const linkTag = onClick
      ? <a onClick={handleClick}>{link}</a>
      : <Link to={link}>{link}</Link>

    return <li key={i}>{linkTag}</li>
  }

  return (
    <ul className="ExampleNav">
      {backLink}
      {links.map(link)}
    </ul>
  )
}

ExampleNav.propTypes = {
  links  : PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onBack : PropTypes.func
}

export default ExampleNav
