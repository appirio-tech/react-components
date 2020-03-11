import React from 'react'
import Tab from './Tab'
import Tabs from './Tabs'

const TabsExamples = () => (
  <div className="flex column middle center light-bg">

    <h1>Tabs</h1>

    <span className="flex center middle">

      <Tabs onSelect={function(eventKey) {console.log(eventKey)}}  defaultActiveKey="1">
            <Tab title="Tab1"eventKey="1" key="1"> 
              This is tab1
            </Tab>
            <Tab title="Tab2"eventKey="2" key="2"> 
              This is tab2
            </Tab>
            <Tab title="Tab3"eventKey="3" key="3"> 
              This is tab3
            </Tab>
        </Tabs>
    </span>
  </div>
)

module.exports = TabsExamples
