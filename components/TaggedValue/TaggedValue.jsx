import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

require('./TaggedValue.scss')

const TaggedValue = ({title, subText, style, count}) => {
  const taggedValueClass = classNames(
    'TaggedValue',
    { [`${style}`]: style,
    'count-one' : !style && count === '1'}
  )
  if(count) {
    subText = `${subText} x ${count}`
  }
  return (
    <div className={taggedValueClass}>
      <div className="tagged-value-bg">{title}</div>
      <span className="subText">{subText}</span>
    </div>
  )
}

TaggedValue.propTypes = {
  title :  PropTypes.string,
  subText :  PropTypes.string,
  style : PropTypes.string,
  count : PropTypes.string
}

export default TaggedValue
