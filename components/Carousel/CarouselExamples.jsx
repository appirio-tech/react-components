import React from 'react'
import Carousel from './Carousel'

import StandardListItem  from '../StandardListItem/StandardListItem'
import PlaceholderIcon  from '../Icons/PlaceholderIcon'

require('./CarouselExamples.scss')


const CarouselExamples = () => (

  <div className="CarouselExamples">
    <p>With limited width</p>
    <div className="limited-width">
      <Carousel>
        <StandardListItem labelText="Community" showIcon={true} imgSrc={require("./placeholder.svg")} />
        <StandardListItem labelText="Compete" showIcon={true} imgSrc={require("./placeholder.svg")} />
        <StandardListItem labelText="Learn" showIcon={true} imgSrc={require("./placeholder.svg")} />
      </Carousel>
    </div>
    <p>With full width</p>
    <div className="full-width">
      <Carousel>
        <StandardListItem labelText="Community" showIcon={true} imgSrc={require("./placeholder.svg")} />
        <StandardListItem labelText="Compete" showIcon={true} imgSrc={require("./placeholder.svg")} />
        <StandardListItem labelText="Learn" showIcon={true} imgSrc={require("./placeholder.svg")} />
      </Carousel>
    </div>
    <p>With limited width and custom first visible element</p>
    <div className="limited-width">
      <Carousel firstVisibleItem={1}>
        <StandardListItem labelText="Community" showIcon={true} imgSrc={require("./placeholder.svg")} />
        <StandardListItem labelText="Compete" showIcon={true} imgSrc={require("./placeholder.svg")} />
        <StandardListItem labelText="Learn" showIcon={true} imgSrc={require("./placeholder.svg")} />
      </Carousel>
    </div>
  </div>
)

module.exports = CarouselExamples
