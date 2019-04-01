import { h, Component, VNode } from 'preact'
import * as parse from 'url-parse'
import { JSXElement } from '@babel/types';

export interface RouteCheck {
  (route: string): boolean
}

interface LinkProps {
  children: JSX.Element | JSX.Element[] | string
  path: string
}

interface RouteDefinition {
  path?: string,
  component?: (new () => Component) | (() => JSX.Element)
}

interface RouteNode extends VNode<RouteDefinition> {}

interface RouterProps {
  children: JSX.Element | JSX.Element[]
}

export class Router extends Component<RouterProps, {}> {
  static getPath (): string {
    return parse(window.location.href).pathname
  }

  static isCurrentRoute = (route: string): boolean => {
    return route === Router.getPath()
  }

  constructor (props: RouterProps) {
    super(props)
  }

  render () {
    return (
      <div>{ this.selectComponents() }</div>
    )
  }

  private selectComponents (): JSX.Element[] {
    return (this.props.children as RouteNode[]).filter(child  => {
      return !child.attributes || !child.attributes.path || child.attributes.path === Router.getPath()
    })
  }
}

export class Route extends Component<RouteDefinition, {}> {
  render () {
    const Component = this.props.component
    return <Component />
  }
}

export function Link (props: LinkProps): JSX.Element {
  return <a href={props.path}>{ props.children }</a>
}
