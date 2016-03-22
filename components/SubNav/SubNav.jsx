require('./SubNav.scss')

import React, { Component } from 'react'
import Carousel from '../Carousel/Carousel'
import StandardListItem from '../StandardListItem/StandardListItem'

const tcSubNav = {
  compete : [
    {img: require('./placeholder.svg'), text: 'Design Challenges', link: '/challenges/design/active'},
    {img: require('./placeholder.svg'), text: 'Development Challenges', link: '/challenges/develop/active'},
    {img: require('./placeholder.svg'), text: 'Data Science Challenges', link: '/challenges/data/active'},
    // TODO dynamic domain
    {img: require('./placeholder.svg'), text: 'Competitive Programming', link: 'https://arena.topcoder.com'}
  ],
  learn : [
    {img: require('./placeholder.svg'), text: 'Getting Started', link: '/getting-started'},
    {img: require('./placeholder.svg'), text: 'Design Challenges', link: '/community/design'},
    {img: require('./placeholder.svg'), text: 'Development Challenges', link: '/community/develop'},
    {img: require('./placeholder.svg'), text: 'Data Science Challenges', link: '/community/data-science'},
    {img: require('./placeholder.svg'), text: 'Competitive Programming', link: '/community/competitive programming/'}
  ],
  community : [
    {img: require('./placeholder.svg'), text: 'Overview', link: '/community/members'},
    // TODO dynamic domain
    {img: require('./placeholder.svg'), text: 'TCO16', link: '//tco16.topcoder.com'},
    {img: require('./placeholder.svg'), text: 'Programs', link: '/community/member-overview'},
    // TODO dynamic domain
    {img: require('./placeholder.svg'), text: 'Forums', link: '//apps.topcoder.com/forums'},
    {img: require('./placeholder.svg'), text: 'Statistics', link: '/community/statistics'},
    {img: require('./placeholder.svg'), text: 'Events', link: '/community/events'},
    {img: require('./placeholder.svg'), text: 'Blog', link: '/blog'}
  ]
}

const SubNav = ({ primaryMenu = 'compete' }) => {
  var subNav = tcSubNav[primaryMenu]
  const subNavMap = (item, idx) => {
    return (
      <StandardListItem key={idx} labelText={item.text} imgSrc={item.img} />
    )
  }
  return (
    <div className="SubNav">
      <Carousel>
        { subNav.map(subNavMap) }
      </Carousel>
    </div>
  )
}

export default SubNav