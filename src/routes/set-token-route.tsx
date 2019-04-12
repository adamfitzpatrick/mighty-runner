import { h } from 'preact'
import { observable } from 'mobx'

import SetToken from '@containers/set-token'

interface Props { path: string }

export default function SetTokenRoute (props: Props) {
  let badToken = false
  if (props.path === '/bad-token') {
    badToken = true
  }
  return <SetToken badToken={badToken} />
}
