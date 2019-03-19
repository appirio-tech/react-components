require('./RichDataTableExample.scss')

import React from'react'
import RichDataTableHeader from './RichDataTableHeader'

const columns = ['Type', 'Projects', 'Status', 'Status Date', 'Customer', 'Copilot']
const sortColumns = {
  Projects: [
    {
      key: 'timestamp-desc',
      value: 'Latest first'
    },
    {
      key: 'timestamp-asc',
      value: 'Oldest first'
    },
    {
      key: 'name-asc',
      value: 'Name A-Z'
    },
    {
      key: 'name-desc',
      value: 'Name Z-A'
    }
  ]
}

const RichDataTableExample = () => (
  <div className="example-wrap">
    <RichDataTableHeader columns={ columns } sortColumns={ sortColumns } />
  </div>
)

module.exports = RichDataTableExample
