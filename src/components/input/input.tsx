import { h, Component } from 'preact'
import classnames from 'classnames'

import * as styles from './input.scss'

interface Props {
  onInput: JSX.EventHandler<Event>
  value: string
  className?: string
  placeholder?: string
  password?: boolean
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
    const wrapperClasses = classnames(
      styles.inputWrapper,
      { [styles.focused]: this.state.focused }
    )
    const inputClasses = classnames(styles.input, this.props.className)
    return (
      <div className={wrapperClasses}>
        <input
          className={inputClasses}
          placeholder={this.props.placeholder}
          type={type}
          value={this.props.value}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onInput={this.props.onInput}
        />
      </div>
    )
  }

  private onFocus = () => {
    this.setState({ focused: true })
  }

  private onBlur = () => {
    this.setState({ focused: false })
  }
}
