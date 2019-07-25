import { h } from 'preact'

import MobxProvider from '@state/mobx-provider'
import DataMock from '@containers/data-mock';

export default function App () {
  return (
    <MobxProvider>
      <DataMock />
    </MobxProvider>
  )
}
