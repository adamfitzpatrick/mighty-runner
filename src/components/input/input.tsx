import { h, Component } from 'preact'
import classnames from 'classnames'

import * as styles from './input.scss'

interface Props {
  label: string
  onInput?: JSX.EventHandler<Event>
  onChange?: JSX.EventHandler<Event>
  value: string
  className?: string
  password?: boolean
  dark?: boolean
  disabled?: boolean
  lowProfile?: boolean
}

interface State {
  focused: boolean
}

export default class Input extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      focused: false
    }
  }

  render () {
    const type = this.props.password ? 'password' : 'text'
    const outerWrapperClasses = classnames(
      styles.outerWrapper,
      { [styles.lowProfile]: this.props.lowProfile }
    )
    const wrapperClasses = classnames(
      styles.inputWrapper,
      { [styles.disabled]: this.props.disabled },
      { [styles.focused]: this.state.focused }
    )
    const inputClasses = classnames(
      styles.input,
      { [styles.inputDark]: this.props.dark },
      this.props.className
      )
    return (
      <div className={outerWrapperClasses}>
        <label for='access_token' className={styles.label}>{ this.props.label }</label>
        <div className={wrapperClasses}>
          <input
            id='access_token'
            className={inputClasses}
            type={type}
            value={this.props.value}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onInput={this.props.onInput}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    )
  }

  private onInput (event: InputEvent) {
    if (this.props.disabled) { return }
    this.props.onInput && this.props.onInput(event)
  }

  private onChange (event: InputEvent) {
    if (this.props.disabled) { return }
    this.props.onChange && this.props.onChange(event)
  }

  private onFocus = () => {
    if (this.props.disabled) { return }
    this.setState({ focused: true })
  }

  private onBlur = () => {
    if (this.props.disabled) { return }
    this.setState({ focused: false })
  }
}
