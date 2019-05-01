import { h, Component } from 'preact'
import classnames from 'classnames'

import * as styles from './expandable.scss'

interface Props {
  shadow?: boolean
  children: JSX.Element[]
  lightBackground?: boolean
  expanded?: boolean
  onClick?: () => void
  locked?: boolean
}

interface State {
  expanderHeight: number
}

export class Expandable extends Component<Props, State> {
  state = {
    expanderHeight: 0
  }
  expander: HTMLElement

  render () {
    return (
      <section className={styles.section}>
        <div
          className={classnames(
            styles.title,
            { [styles.titleExpanded]: this.props.expanded && this.props.shadow }
          )}
          onClick={this.props.locked ? () => { /* no-op */ } : this.props.onClick}
        >
          {
            this.props.locked ?
            null :
            <button className={classnames(
              styles.icon,
              { [styles.iconLightBackground]: this.props.lightBackground },
              { [styles.iconExpanded]: this.props.expanded }
            )}>
              &#x25b7;
            </button>
          }
          { this.props.children[0] }
        </div>
        { this.renderExpander() }
      </section>
    )
  }

  componentDidMount () {
    this.doExpandCollapse()
  }

  componentDidUpdate () {
    this.doExpandCollapse()
  }

  private doExpandCollapse = () => {
    if (this.props.expanded && this.state.expanderHeight === 0) {
      this.expand()
    } else if (!this.props.expanded && this.state.expanderHeight !== 0) {
      this.collapse()
    }
  }

  private renderExpander () {
    return (
      <div
        className={styles.expander}
        style={{ height: `${this.state.expanderHeight}px` }}
        ref={expander => this.expander = expander}
      >
        { this.props.children.slice(1) }
      </div>
    )
  }

  private expand = () => {
    this.setState({ expanderHeight: this.expander.scrollHeight })
  }

  private collapse = () => {
    this.setState({ expanderHeight: 0 })
  }
}
