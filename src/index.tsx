import * as React from 'react'
import { render } from 'react-dom'

/** Global & pre-loader stylesheets */
import '@assets/global.scss'
import App from '@components/app'

const target = document.getElementById('home')

if (target) {
  render((
    <App />
  ), target)
}
