import { h, Component, FunctionalComponent } from 'preact'

import DigiGridBackground from '@components/digi-grid-background'
import Header from '@components/header'
import CharacterList from '@components/character-list'
import { Router, Route, Link } from '@components/router'
import Loader from '@components/loader'
import Logo from '@components/logo'
import * as logo from '../../design/logo.svg'

import * as styles from './app.scss'

export default function App () {
  return (
    <Router>
      <DigiGridBackground clear={ Router.isCurrentRoute('/') }/>
      <Route path='/' component={ Loader } />
      <Route path='/characters' component={ Header } />
      <Route path='/characters' component={ CharacterList }/>
    </Router>
  )
}

