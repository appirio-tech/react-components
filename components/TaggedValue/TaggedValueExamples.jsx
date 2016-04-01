require('./TaggedValueExamples.scss')

import React from 'react'
import TaggedValue from './TaggedValue'
import TaggedValueList from './TaggedValueList'

const taggedValueData1 = {
  title : 'title1',
  subText : 'SubText1',
  style : 'sample1'
}

const taggedValueData2 = {
  title : 'title2',
  subText : 'SubText2',
  style : 'sample2',
  count:'5'
}

const taggedValueItems1 = {
  items : [taggedValueData1,taggedValueData2,taggedValueData1,taggedValueData2]
}

const TaggedValueExamples = () => (
    <div>
      <div className="divStyle">
        <TaggedValue title={taggedValueData1.title} subText={taggedValueData1.subText} count="1"/>
          <TaggedValue title={taggedValueData1.title} subText={taggedValueData1.subText}/>
        <TaggedValue title={taggedValueData2.title} subText={taggedValueData2.subText} style={taggedValueData2.style} count={taggedValueData2.count}/>
      </div>
      <br/>
      <div className="divStyle">
        <TaggedValueList items={taggedValueItems1.items} layout="scroll"/>
      </div>
      <br/>
      <div className="divStyle">
        <TaggedValueList items={taggedValueItems1.items} layout="wrap"/>
      </div>
    </div>
)

module.exports = TaggedValueExamples