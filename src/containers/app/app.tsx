import { h } from 'preact'

import MobxProvider from '@state/mobx-provider'
import SmartStat from '@containers/smart-stat'

export default function App () {
  return (
    <MobxProvider>
      <div style={{ position: 'fixed', top: '5rem', left: '5rem' }}>
        <SmartStat attributePath={ [ 'attributes', 'agility' ] } round />
      </div>
    </MobxProvider>
  )
}
