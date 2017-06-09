'use strict'
import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'
import Tooltip from '../Tooltip/Tooltip'
import IconUICheckSimple from '../Icons/IconUICheckSimple'
import { HOC as hoc } from 'formsy-react'

class TiledRadioGroup extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(value) {
    this.props.setValue(value)
    this.props.onChange(this.props.name, value)
  }

  render() {
    const { wrapperClass, options, theme, tabable } = this.props
    const hasError = !this.props.isPristine() && !this.props.isValid()
    const disabled = this.props.isFormDisabled() || this.props.disabled
    const errorMessage = this.props.getErrorMessage() || this.props.validationError
    const curValue = this.props.getValue()

    const renderOption = (opt, idx) => {
      const itemClassnames = classNames('tiled-group-item', theme, {
        active: curValue === opt.value
      }, {
        disabled: opt.disabled
      })
      const handleClick = () => this.onChange(opt.value)
      const handleFocus = (e) => {
        e.target.parentNode.classList.add('focused')
      }
      const handleBlur = (e) => {
        e.target.parentNode.classList.remove('focused')
      }
      const Icon = opt.icon
      const renderTile = () => (
        <a onClick={ !disabled && !opt.disabled && handleClick } data-value={opt.value} className={itemClassnames} key={idx} >
          {
            !!tabable &&
            <input type="radio" name={ this.props.name }
              style={{ position : 'absolute', left : '-9999px'}}
              onFocus={handleFocus}
              onChange={handleClick}
              onBlur={handleBlur}
            />
          }
          <span className="icon">{ opt.icon && <Icon {...opt.iconOptions} />}</span>
          <span className="title">{opt.title}</span>
          <small>{opt.desc}</small>
          {
            curValue === opt.value &&
            <span className="check-mark">
              <IconUICheckSimple fill="#fff" width={12} height={12}/>
            </span>
          }
        </a>
      )
      return (
        <span key={ idx }>
        {
          opt.disabled ?
          <Tooltip>
            <div className="tooltip-target" id={'tooltip-' + idx}>
              {renderTile()}
            </div>
            <div className="tooltip-body">
              <p>{opt.errorMessage}</p>
            </div>
          </Tooltip> :
          renderTile()
        }
        </span>
      )
    }

    return (
      <div className={`${wrapperClass} tiled-group-row`}>
        {options.map(renderOption)}
      { hasError ? (<p className="error-message">{errorMessage}</p>) : null}
      </div>
    )
  }
}
TiledRadioGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      desc: PropTypes.string
      // icon: PropTypes.
    }).isRequired
  ).isRequired
}

TiledRadioGroup.defaultProps = {
  onChange: () => {}
}

export default hoc(TiledRadioGroup)
