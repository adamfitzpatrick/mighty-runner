import { h, Component } from 'preact'

import Background from '@components/background'
import CharacterCard from '@components/character-card'

export default class App extends Component<{}, {}> {
  render () {
    return (
      <div>
        <Background />
        <div style={{ position: 'relative' }}>
          <CharacterCard />
        </div>
      </div>
    )
  }
}
