import { h, Component } from 'preact'
import { inject } from 'mobx-preact'

import MobxProvider from '@state/mobx-provider'
import { ActiveCharacterProps } from '@state/active-character-store'
import { Attribute } from '@models'
import EditAttribute from '@components/edit-attribute'
import SmartStat from '@containers/smart-stat'

@inject('activeCharacter')
class Thing extends Component<ActiveCharacterProps> {
  render () {
    return (
      <div style={{ margin: '5rem 5rem 5rem 5rem' }}>
        <EditAttribute
          attribute={this.props.activeCharacter!.attributes!.agility}
          effectedBy={[ this.props.activeCharacter!.effects![0] ]}
          effects={[]}
        />
      </div>
    )
  }

  componentWillMount () {
    const character = {
      userId: '5ZBbOZJtFNs2esIVciyJ',
      id: '1',
      name: 'Character'
    }
    const attributes = {
      agility: { shortName: 'agi', name: 'Agility', value: { initial: 1, chargen: 5 }, asTarget: [ 'attributes', 'agility' ], maximum: 6 } as Attribute
    }
    const otherAttributes = {
      essence: { name: 'essence', value: { initial: 6 }, asTarget: [ 'otherAttributes', 'essence' ] } as Attribute
    }
    const effects = [{
      name: 'Effect 1',
      id: '1',
      value: 1,
      active: true,
      target: [ 'attributes', 'agility' ]
    }, {
      name: 'Effect 2',
      id: '2',
      value: 145,
      active: false,
      target: [ 'target', '1' ]
    }]
    const persistableCharacter = {
      userId: character.userId,
      id: character.id,
      name: character.name,
      attributes,
      otherAttributes,
      effects
    }
    this.props.activeCharacter!.setActiveCharacter(persistableCharacter)
  }
}

export default function App () {
  return (
    <MobxProvider>
      <Thing />
    </MobxProvider>
  )
}
