'use strict'

require('./LoaderStyle.scss');
const React = require('react');

const Loader = () => (
  <div className="Loader">
    <div className="Loader__container">
      <div className="Loader__loader"/>
    </div>
  </div>);

module.exports = Loader;
