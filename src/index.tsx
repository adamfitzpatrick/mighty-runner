import { h, render } from 'preact'

/** Global & pre-loader stylesheets */
import '@assets/global.scss'
import App from '@containers/app'

render((
  <App />
), document.body)
