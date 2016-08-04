require('./RichDataTableHeader.scss')

import React from 'react'
import classNames from 'classnames'
import SelectDropdown from '../SelectDropdown/SelectDropdown'

const RichDataTableHeader = ({ columns, sortColumns, onSort}) => {
  const handleClick = (column, option) => {
    if (onSort && typeof onSort === 'function') {
      onSort(column, option)
    }
  }
  const renderColumn = (column, idx) => {
    let sortFilter = null
    if (sortColumns && sortColumns[column.key]) {
      const sortOptions = sortColumns[column.key]
      const handleSortClick = (option) => {
        handleClick(column, option)
      }
      sortFilter = (
        <SelectDropdown theme="default" className="sort-filter" options={ sortOptions } onSelect={ handleSortClick } />
      )
    }
    const columnClasses = classNames({
      'rich-data-table-header-column' : true,
      'sorted-asc' : column.sorted === 'asc',
      'sorted-desc' : column.sorted === 'desc'
    })
    return (
      <div className={ columnClasses } key={ idx }>
        { column.displayName }
        { sortFilter }
      </div>
    )
  }
  return (
    <div className="RichDataTableHeader">
      { columns.map(renderColumn) }
    </div>
  )
}

export default RichDataTableHeader