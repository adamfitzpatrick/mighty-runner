import { h } from 'preact'

import Loader from '@containers/loader'

interface Props {
  path: string
}

export default function BaseRoute (props: Props) {
  return <Loader />
}
