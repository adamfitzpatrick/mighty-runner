import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Character, Effect, Gear } from '@models'

import { AppState } from '@state/initial-state'
import { loadCharacterCreator } from '@state/actions'

function DataMock () {
  const character = useSelector((state: AppState) => state.activeCharacter)
  const dispatch = useDispatch()

  if (!character) {
    loadCharacterCreator(dispatch)({ id: '1' } as Character)
    return <div>no data</div>
  }

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
      <h2>Gear</h2>
      <ul>
        { character.gear.map((gear: Gear) => <li key={gear.id}>{ JSON.stringify(gear) }</li>)}
      </ul>
      <h2>Effects</h2>
      <ul>
        { character.effects.map((effect: Effect) => <li key={effect.id}>{ JSON.stringify(effect) }</li>)}
      </ul>
    </div>
  )
}

export default DataMock
