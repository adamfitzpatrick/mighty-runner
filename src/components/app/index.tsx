import { h, Component } from 'preact'
import classnames from 'classnames'

import { CharacterModel } from '@assets/models'
import CRT from '@components/crt';
import HackerBackground from '@components/hacker-background'
import Header from '@components/header'
import CharacterList from '@components/character-list';
import CharacterCard from '@components/character-card'

import * as image from '@assets/images/melodium_flynn.png'
import * as styles from './app.scss'

interface AppState {
  showTopCrt: boolean
}

export default class App extends Component<{}, AppState> {
  constructor () {
    super()
    this.state = { showTopCrt: true }
  }

  render () {
    return (
      <div>
        <HackerBackground />
        <CRT />
        <main className={styles.main}>
          <Header />
          <CharacterList />
        </main>
      </div>
    )
  }
}
