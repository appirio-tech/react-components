'use strict'

require('./DropdownExamples.scss')
let Dropdown = require('./Dropdown.jsx')
let React    = require('react')
let items = [
      'Review',
      'Web Arena',
      'Applet Arena',
    ]

let DropdownExamples = {
  render: function() {
    let dom = 
      <section>
        <div className="dropdown-example full-width">
          <Dropdown pointerShadow>
            <a className="dropdown-menu-header">Full Width Dropdown</a>
            <ul className="dropdown-menu-list">
              {
                items.map(function(link, i) {
                  return <li key={i}><a href="javascript:;">{link}</a></li>
                })
              }
            </ul>
          </Dropdown>
        </div>

        <div className="dropdown-example limited-width">
          <Dropdown pointerShadow>
            <a className="dropdown-menu-header">Limited Width Dropdown</a>
            <ul className="dropdown-menu-list">
              {
                items.map(function(link, i) {
                  return <li key={i}><a href="javascript:;">{link}</a></li>
                })
              }
            </ul>
          </Dropdown>
        </div>

        <div className="dropdown-example limited-width">
          <Dropdown >
            <a className="dropdown-menu-header">Limited Width Dropdown No Pointer Shadow</a>
            <ul className="dropdown-menu-list">
              {
                items.map(function(link, i) {
                  return <li key={i}><a href="javascript:;">{link}</a></li>
                })
              }
            </ul>
          </Dropdown>
        </div>

        <div className="dropdown-example limited-width">
          <Dropdown noPointer>
            <a className="dropdown-menu-header">Limited Width Dropdown No Pointer</a>
            <ul className="dropdown-menu-list">
              {
                items.map(function(link, i) {
                  return <li key={i}><a href="javascript:;">{link}</a></li>
                })
              }
            </ul>
          </Dropdown>
        </div>

        <div className="dropdown-example no-pointer">
          <Dropdown noPointer pointerShadow>
            <a className="dropdown-menu-header">Dropdown No Pointer</a>
            <ul className="dropdown-menu-list">
              {
                items.map(function(link, i) {
                  return <li key={i}><a href="javascript:;">{link}</a></li>
                })
              }
            </ul>
          </Dropdown>
        </div>
      </section>
      
    return dom;
  }
}

module.exports = React.createClass(DropdownExamples);
