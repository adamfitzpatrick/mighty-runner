import { h, Component, cloneElement } from 'preact'

interface Props {
  exclusive?: boolean
  children: JSX.Element[]
}

interface State {
  childStates: boolean[]
}

export class ExpandableGroup extends Component<Props, State> {
  state = {
    childStates: new Array(this.props.children.length).fill(false)
  }

  render () {
    return (
      <div>
        { this.renderExpanders() }
      </div>
    )
  }

  private renderExpanders () {
    return this.props.children.map((child, index) => {
      const attrs = {
        expanded: this.state.childStates[index],
        onClick: this.getClickHandler(index)
      }
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
      this.setState({ childStates })
    }
  }
}
