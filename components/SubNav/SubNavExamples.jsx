import React from 'react'
import SubNav from './SubNav'

require('./SubNavExamples.scss')

const SubNavExamples = () => (

  <div className="SubNavExamples">
    <p>Compete Sub Navigation</p>
    <div>
      <SubNav primaryMenu="compete" />
    </div>
    <p>Learn Sub Navigation</p>
    <div>
      <SubNav primaryMenu="learn" />
    </div>
    <p>Community Sub Navigation</p>
    <div>
      <SubNav primaryMenu="community" />
    </div>
  </div>
)

module.exports = SubNavExamples
