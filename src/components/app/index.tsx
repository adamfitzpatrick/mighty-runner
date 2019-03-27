import { h, Component, FunctionalComponent } from 'preact'

import DigiGridBackground from '@components/digi-grid-background'
import Header from '@components/header'
import CharacterList from '@components/character-list'
import { Router, Route, Link } from '@components/router'
import * as styles from './app.scss'

export default function App () {
  return (
    <div>
      <DigiGridBackground clear={true} />
    </div>
  )
}


