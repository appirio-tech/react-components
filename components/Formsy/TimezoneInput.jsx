import React from 'react'
import PropTypes from 'prop-types'
import { orderBy } from 'lodash'

import { timezones } from '../../constants/timezones'

/**
 * This component is a wrapper for selecting timezones
 * @param {Object} props Component props
 * @param {string} props.filterCountry alpha2 code of the country selected.
 *                                     When this is set, the time zone options are filtered to show
 *                                     Only the timezones falling in the selected country
 * @param {func} prop.render a function that renders the actual select component. E.g. connect app uses Formsy select to render the options
 *                           The function is passed with a list of timezone strings.
 */
class TimezoneInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timezoneOptions: this.formatTimezoneOptions(timezones)
    }
  }

  /**
   * Formats the timezone objects into the structure consumable by select controls
   */
  formatTimezoneOptions(_timezones) {
    return orderBy(_timezones, ['zoneName'], ['asc']).map(tz => ({
      value: tz.zoneName,
      label: tz.zoneName,
      data: tz
    }))
  }

  /**
   * Filters timezones based on the user input. User can type either the country name or the timezone name
   * @param {Object} tz timezone object with value, label and data that is set by formatTimezoneOptions method
   * @param {string} searchText the search text typed by the user
   */
  filterTimezones(tz, searchText = '') {
    const lowerCaseSearchText = searchText.toLowerCase()
    const matchesSearch = matchText => matchText.toLowerCase().includes(lowerCaseSearchText)


    return !searchText || (matchesSearch(tz.data.zoneName) || matchesSearch(tz.data.countryName))
  }


  render() {
    const { render } = this.props
    const { timezoneOptions } = this.state

    return render(timezoneOptions, this.filterTimezones)
  }
}

TimezoneInput.PropTypes = {
  render: PropTypes.func.isRequired
}

export default TimezoneInput
