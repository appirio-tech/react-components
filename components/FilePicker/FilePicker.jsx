import React, { PropTypes } from 'react'
import _ from 'lodash'
import filepicker from 'filepicker-js'

class FilePicker extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    this.props.onSuccess(this.props.options.multiple ? event.fpfiles : event.fpfile)
  }

  componentDidMount() {
    const filepickerElement = this.refs.filepicker
    filepicker.setKey(this.props.apiKey)
    filepicker.constructWidget(filepickerElement)
    filepickerElement.addEventListener('change', this.onChange, false);
  }

  componentWillUnmount() {
    this.refs.filepicker.removeEventListener('change', this.onChange, false);
  }

  render() {
    const { apiKey, onSuccess, mode, options } = this.props
    const element = this.refs.target

    // add data-fp- prefix to all keys
    const opts = _.mapKeys(options, (v,k) => {
      const hyphenated = k.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
      return `data-fp-${hyphenated}`
    })
    return <input type={mode} ref="filepicker" onchange={this.onChange} {...opts} />
  }
}

FilePicker.propTypes = {
  apiKey: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired
}

export default FilePicker
