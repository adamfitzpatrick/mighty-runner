import { h, render } from 'preact'

/** Global & pre-loader stylesheets */
import '@assets/global.scss'
import App from '@components/app';

render((
  <App />
), document.body)
