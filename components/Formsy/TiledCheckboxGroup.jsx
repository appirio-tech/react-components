'use strict'
import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'
import Tooltip from '../Tooltip/Tooltip'
import IconUICheckSimple from '../Icons/IconUICheckSimple'
import { HOC as hoc } from 'formsy-react'

class TiledCheckboxGroup extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.getCheckMarkIconActive = this.getCheckMarkIconActive.bind(this)
  }

  onChange(value) {
    const curValue = this.props.getValue() || []
    const index = curValue.indexOf(value)
    const newValue = [...curValue]
    if (index > -1) {
      newValue.splice(index, 1)
    } else {
      newValue.push(value)
    }
    this.props.setValue(newValue)
    this.props.onChange(this.props.name, newValue)
  }

  getCheckMarkIconActive() {
    return (this.props.checkMarkActiveIcon ? this.props.checkMarkActiveIcon : (
      <span className="check-mark">
      <IconUICheckSimple fill="#fff" width={12} height={12}/>
    </span>))
  }

  render() {
    const { wrapperClass, options, theme, tabable } = this.props
    const curValue = this.props.getValue() || []
    const hasError = !this.props.isPristine() && !this.props.isValid()
    const disabled = this.props.isFormDisabled() || this.props.disabled
    const errorMessage = this.props.getErrorMessage() || this.props.validationError

    const renderOption = (opt, idx) => {
      const checked = curValue.indexOf(opt.value) > -1
      const itemClassnames = classNames('tiled-group-item', theme, {
        active: checked
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
      const setRef = (c) => this['element-' + idx] = c
      const renderTile = () => (
        <a onClick={ !disabled && !opt.disabled && handleClick } data-value={opt.value} className={itemClassnames} key={idx} >
          {
            !!tabable &&
            <input
              ref={setRef}
              type="checkbox"
              name={ this.props.name }
              style={{ position : 'absolute', left : '-9999px'}}
              onFocus={handleFocus}
              onChange={this.onChange}
              onBlur={handleBlur}
            />
          }
          {
            this.props.showCheckMarkBeforeTitle
            && (checked
            ? this.getCheckMarkIconActive()
            : this.props.checkMarkUnActiveIcon)
          }
          <span className="icon">{ opt.icon && <Icon {...opt.iconOptions} />}</span>
          <span className="title">{opt.title}</span>
          <small>{opt.desc}</small>
          {
            !this.props.showCheckMarkBeforeTitle
            && (checked
            ? this.getCheckMarkIconActive()
            : this.props.checkMarkUnActiveIcon)
          }
        </a>
      )
      return (
        <span key={ idx } className="tiled-group-item-container">
        {
          opt.disabled && opt.errorMessage ?
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

        {this.props.label && (
          <label className="tc-label">
          {this.props.label}
        </label>)}
        {options.map(renderOption)}
      { hasError ? (<p className="error-message">{errorMessage}</p>) : null}
      </div>
    )
  }
}
TiledCheckboxGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      desc: PropTypes.string
      // icon: PropTypes.
    }).isRequired
  ).isRequired,
  checkMarkActiveIcon: PropTypes.node,
  checkMarkUnActiveIcon: PropTypes.node,
  showCheckMarkBeforeTitle: PropTypes.bool
}

TiledCheckboxGroup.defaultProps = {
  onChange: () => {},
  showCheckMarkBeforeTitle: false
}

export default hoc(TiledCheckboxGroup)
