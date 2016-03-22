import React from 'react'
import Carousel from './Carousel'

import StandardListItem  from '../StandardListItem/StandardListItem'

require('./CarouselExamples.scss')


const CarouselExamples = () => (

  <div className="CarouselExamples">
    <p>With limited width</p>
    <div className="limited-width">
      <Carousel>
        <StandardListItem labelText="Community" imgSrc={require('./placeholder.svg')} />
        <StandardListItem labelText="Compete" imgSrc={require('./placeholder.svg')} />
        <StandardListItem labelText="Learn" imgSrc={require('./placeholder.svg')} />
      </Carousel>
    </div>
    <p>With full width</p>
    <div className="full-width">
      <Carousel>
        <StandardListItem labelText="Community" imgSrc={require('./placeholder.svg')} />
        <StandardListItem labelText="Compete" imgSrc={require('./placeholder.svg')} />
        <StandardListItem labelText="Learn" imgSrc={require('./placeholder.svg')} />
      </Carousel>
    </div>
    <p>With limited width and custom first visible element</p>
    <div className="limited-width">
      <Carousel firstVisibleItem={1}>
        <StandardListItem labelText="Community" imgSrc={require('./placeholder.svg')} />
        <StandardListItem labelText="Compete" imgSrc={require('./placeholder.svg')} />
        <StandardListItem labelText="Learn" imgSrc={require('./placeholder.svg')} />
      </Carousel>
    </div>
  </div>
)

module.exports = CarouselExamples
