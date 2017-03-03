require('./SubNav.scss')

import React from 'react'
import Carousel from '../Carousel/Carousel'
import StandardListItem from '../StandardListItem/StandardListItem'

const tcSubNav = {
  compete : [
    {img: require('-!file!./placeholder.svg'), text: 'Design Challenges', link: '/challenges/design/active'},
    {img: require('-!file!./placeholder.svg'), text: 'Development Challenges', link: '/challenges/develop/active'},
    {img: require('-!file!./placeholder.svg'), text: 'Data Science Challenges', link: '/challenges/data/active'},
    {img: require('-!file!./placeholder.svg'), text: 'Competitive Programming', link: process.env.ARENA_URL}
  ],
  learn : [
    {img: require('-!file!./placeholder.svg'), text: 'Getting Started', link: '/getting-started'},
    {img: require('-!file!./placeholder.svg'), text: 'Design Challenges', link: '/community/design'},
    {img: require('-!file!./placeholder.svg'), text: 'Development Challenges', link: '/community/develop'},
    {img: require('-!file!./placeholder.svg'), text: 'Data Science Challenges', link: '/community/data-science'},
    {img: require('-!file!./placeholder.svg'), text: 'Competitive Programming', link: '/community/competitive programming/'}
  ],
  community : [
    {img: require('-!file!./placeholder.svg'), text: 'Overview', link: '/community/members'},
    {img: require('-!file!./placeholder.svg'), text: 'TCO16', link: process.env.TCO16_URL},
    {img: require('-!file!./placeholder.svg'), text: 'Programs', link: '/community/member-overview'},
    {img: require('-!file!./placeholder.svg'), text: 'Forums', link: process.env.FORUMS_APP_URL},
    {img: require('-!file!./placeholder.svg'), text: 'Statistics', link: '/community/statistics'},
    {img: require('-!file!./placeholder.svg'), text: 'Events', link: '/community/events'},
    {img: require('-!file!./placeholder.svg'), text: 'Blog', link: '/blog'}
  ]
}

const SubNav = ({ primaryMenu = 'compete' }) => {
  const subNav = tcSubNav[primaryMenu]
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