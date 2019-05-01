import { h, Component, cloneElement } from 'preact'

interface Props {
  exclusive?: boolean
  children: JSX.Element | JSX.Element[]
  className?: string
  onChildStateChange?: (childStates: boolean[]) => void
  childStates?: boolean[]
  lockAll?: boolean
}

interface State {
  childStates: boolean[]
}

interface ChildConfigurableProps {
  expanded: boolean
  onClick: () => void
  locked?: boolean
}

export class ExpandableGroup extends Component<Props, State> {
  state = {
    childStates: this.props.childStates ||
      new Array((this.props.children as JSX.Element[]).length).fill(false)
  }
  onChildStateChange = this.props.onChildStateChange || (() => { /* no-op */ })
  externalStateReceived: false

  render () {
    return (
      <div className={this.props.className}>
        { this.renderExpanders() }
      </div>
    )
  }

  private renderExpanders () {
    return (this.props.children as JSX.Element[]).map((child, index) => {
      const attrs: ChildConfigurableProps = {
        expanded: this.state.childStates[index] || this.props.lockAll,
        onClick: this.getClickHandler(index)
      }
      if (this.props.lockAll) { attrs.locked = true }
      return cloneElement(child, attrs)
    })
  }

  private getClickHandler = (targetIndex: number) => {
    return () => {
      const childStates = this.state.childStates.map((childState, index) => {
        if (index !== targetIndex) {
          return this.props.exclusive ? false : childState
        }
        return !childState
      })
      this.setState({ childStates }, () => this.onChildStateChange(this.state.childStates))
    }
  }
}
