import { h } from 'preact'

import Loader from '@containers/loader'
import DigiGridBackground from '@components/digi-grid-background';

interface Props {
  path: string
}

export default function BaseRoute (props: Props) {
  return <Loader />
}
