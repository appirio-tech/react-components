'use strict'
import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import _ from 'lodash'
import { HOC as hoc } from 'formsy-react'

class TiledCheckbox extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  onChange(value, event) {
    event.preventDefault()
    const newValue = _.xor(this.props.getValue(), [value])
    this.props.setValue(newValue)
    this.props.onChange(this.props.name, newValue)
  }

  componentWillReceiveProps(nextProps) {
    this.props.setState(nextProps.value)
  }

  render() {
    const { wrapperClass, options } = this.props
    const hasError = !this.props.isPristine() && !this.props.isValid()
    const disabled = this.props.isFormDisabled() || this.props.disabled
    const errorMessage = this.props.getErrorMessage() || this.props.validationError
    const curValue = this.props.getValue()

    const renderOption = (opt, idx) => {
      // adding classes eg. "phone active"
      const itemClassnames = classNames(opt.value, {
        active: _.indexOf(curValue, opt.value) > -1
      })
      const handleClick = this.onChange.bind(this, opt.value)
      return (
        <a onClick={ !disabled && handleClick } className={itemClassnames} key={idx} >
          <span className="icon"></span>
          <span className="title">{opt.title}</span>
          <small>{opt.desc}</small>
        </a>
      )
    }

    return (
      <div className={wrapperClass}>
        {options.map(renderOption)}
      { hasError ? (<p className="error-message">{errorMessage}</p>) : null}
      </div>
    )
  }
}
TiledCheckbox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}

TiledCheckbox.defaultProps = {
  onChange: () => {}
}

export default hoc(TiledCheckbox)
