import { h, Component } from 'preact'

import Background from '@components/background'

export default class App extends Component<{}, {}> {
  render () {
    return (
      <div>
        <Background />
      </div>
    )
  }
}
