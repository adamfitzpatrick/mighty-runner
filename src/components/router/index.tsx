import { h, Component, VNode } from 'preact'
import * as parse from 'url-parse'

interface LinkProps {
  children: JSX.Element | JSX.Element[] | string
  path: string
}

interface RouteDefinition {
  path: string,
  component: (new () => Component) | (() => JSX.Element)
}

interface RouteNode extends VNode<RouteDefinition> {}

interface RouterProps {
  children: JSX.Element | JSX.Element[]
}

interface RouterState {
  route: string
}

export class Router extends Component<RouterProps, RouterState> {
  constructor (props: RouterProps) {
    super(props)
    this.state = {
      route: window.location.href
    }
  }

  getPath () {
    return parse(this.state.route).pathname
  }

  selectComponent (): JSX.Element {
    return (this.props.children as RouteNode[]).find(child  => {
      return child.attributes.path === this.getPath()
    })
  }

  render () {
    return (
      <div>{ this.selectComponent() }</div>
    )
  }
}

export class Route extends Component<RouteDefinition, {}> {
  render () {
    const Component = this.props.component
    return <Component />
  }
}

export function Link (props: LinkProps) {
  return <a href={props.path}>{ props.children }</a>
}
