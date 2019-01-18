import { h, Component } from 'preact'
import classnames from 'classnames'

import * as styles from './input.scss'

export interface InputProps {
  handler: (event: KeyboardEvent) => void
  value: string
  label?: string
  message?: string
  placeholder?: string
  showMessageWhenValid?: boolean
  invalid?: boolean
  disabled?: boolean
}

interface InputState {
  hasHover: boolean
  inputFocus: boolean
}

class Input extends Component<InputProps, InputState> {
  constructor (props: InputProps) {
    super(props)
    this.state = {
      hasHover: false,
      inputFocus: false
    }
  }

  handleMouseEnter = () => {
    this.setState({ hasHover: true })
  }

  handleMouseLeave = () => {
    this.setState({ hasHover: false })
  }

  handleInputFocus = () => {
    this.setState({ inputFocus: true })
  }

  handleInputBlur = () => {
    this.setState({ inputFocus: false })
  }

  getHoverClass = () => {
    return classnames(
      styles.dynamicHoverUnderline,
      {
        [ styles.dynamicHoverUnderlineHovered ]: this.state.hasHover && !this.state.inputFocus,
        [ styles.dynamicHoverUnderlineRemoved ]: this.state.inputFocus
      }
    )
  }

  getFocusClass = () => {
    return classnames(
      styles.dynamicFocusUnderline,
      { [ styles.dynamicFocusUnderlineFocused ]: this.state.inputFocus }
    )
  }

  renderMessageArea () {
    if (!this.props.message) { return null }
    if (this.props.invalid || this.props.showMessageWhenValid) {
      return <small className={styles.message}>{this.props.message}</small>
    }
    return <small className={styles.message}>&nbsp;</small>
  }

  render () {
    const inputGroupClass = classnames(
      styles.inputGroup,
      {
        [ styles.inputGroupError ]: this.props.invalid,
        [ styles.inputGroupDisabled]: this.props.disabled
      }
    )
    return (
      <div
        className={inputGroupClass}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={this.getHoverClass()} />
        <div className={this.getFocusClass()} />
        <label className={styles.label}>
          {this.props.label}
          <input
            value={this.props.value}
            onKeyUp={this.props.handler}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            className={styles.input}
            placeholder={this.props.placeholder}
          />
        </label>
        {this.renderMessageArea()}
      </div>
    )
  }
}

export default Input
