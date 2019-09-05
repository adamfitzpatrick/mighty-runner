import * as React from 'react'
import { connect } from 'react-redux'
import { Character, Effect } from '@models'

import * as styles from './data-mock.scss'
import { AppState } from '@state/initial-state'

interface DataMockProps {
  activeCharacter?: Character
}

function DataMock (props: DataMockProps) {
  const character = props.activeCharacter
  if (!character) { return null }

  return (
    <div>
      <h1>General Data</h1>
      <ul>
        <li>userId: { character.userId }</li>
        <li>id: { character.id }</li>
        <li>name: { character.name }</li>
      </ul>
      <h2>Attributes</h2>
      <ul>
        <li>bod: { JSON.stringify(character.attributes.body) }</li>
        <li>agi: { JSON.stringify(character.attributes.agility) }</li>
        <li>rea: { JSON.stringify(character.attributes.reaction) }</li>
        <li>str: { JSON.stringify(character.attributes.strength) }</li>
        <li>wil: { JSON.stringify(character.attributes.willpower) }</li>
        <li>log: { JSON.stringify(character.attributes.logic) }</li>
        <li>int: { JSON.stringify(character.attributes.intuition) }</li>
        <li>cha: { JSON.stringify(character.attributes.charisma) }</li>
      </ul>
      <h2>Special Attributes</h2>
      <ul>
        <li>edge: { JSON.stringify(character.specialAttributes.edge) }</li>
        <li>magic: { JSON.stringify(character.specialAttributes.magic) }</li>
        <li>resonance: { JSON.stringify(character.specialAttributes.resonance) }</li>
      </ul>
      <h2>Effects</h2>
      <ul>
        { character.effects.map((effect: Effect) => <li key={effect.id}>{ JSON.stringify(effect) }</li>)}
      </ul>
    </div>
  )
}

function mapStateToProps (state: AppState): DataMockProps {
  return { activeCharacter: state.activeCharacter }
}

export default connect<DataMockProps, {}, {}>(mapStateToProps)(DataMock)
