import * as React from 'react'
import { useSelector } from 'react-redux'
import { v4 } from 'uuid'

import * as Models from '@models'
import { getApplicationStateManagers } from './effects'
import Effect from '@components/effect'
import Button from '@components/button'
import { AppState } from '@state/default-state'

import * as styles from './effects.scss'

interface EffectsByIdProps {
  ids: string[]
  edit?: boolean
  onAdd?: (effect: Models.Effect) => void
}

interface EffectsByIdState {
  newEffect: Models.Effect | null
}

function generateNewEffect (): Models.Effect {
  const id = v4()
  return {
    id,
    name: '',
    description: '',
    value: 0,
    active: false,
    target: []
  }
}

export default function EffectsById (props: EffectsByIdProps) {
  const { updateEffect, addEffect, removeEffect, saveCharacter } = getApplicationStateManagers()
  const [ state, setState ] = React.useState({ newEffect: null } as EffectsByIdState)

  let effects = useSelector((state: AppState) => state.effects)
  if (!effects) { return null }

  const relevantEffects = effects.filter(effect => props.ids.indexOf(effect.id) !== -1)

  const addButtonhandler = () => {
    updateNewEffect(generateNewEffect())
  }

  const updateNewEffect = (effect: Models.Effect) => {
    setState({ newEffect: effect })
  }

  const doneAddingNewEffect = () => {
    addEffect(state.newEffect!)
    props.onAdd && props.onAdd(state.newEffect!)
    saveCharacter()
    setState({ newEffect: null })
  }

  const cancelAddingNewEffect = () => {
    setState({ newEffect: null })
  }

  function renderEffect (effect: Models.Effect) {
    return <Effect
      key={ effect.id }
      effect={ effect }
      onToggle={ updateEffect }
    />
  }

  function renderEffectForEdit (effect: Models.Effect) {
    return (
      <Effect
        key={ effect.id }
        effect={ effect }
        onChange={ updateEffect }
        onRemove={ removeEffect }
        onBlur={ saveCharacter }
      />
    )
  }

  function renderEffectsList () {
    return relevantEffects.map(effect => {
      return (props.edit ? renderEffectForEdit : renderEffect).call(this, effect)
    })
  }

  function renderAddedEffect () {
    return state.newEffect ?
      <Effect
        effect={ state.newEffect }
        onChange={ updateNewEffect }
      /> :
      null
  }

  function renderAddingEffectButtons () {
    if (props.edit && !state.newEffect) {
      return <Button label='Add Effect' onClick={ addButtonhandler } />
    }
    if (props.edit && state.newEffect) {
      return <React.Fragment>
        <Button label='Done Adding Effect' onClick={ doneAddingNewEffect } />
        <Button label='Cancel Adding Effect' onClick={ cancelAddingNewEffect } />
      </React.Fragment>
    }
    return null
  }

  return <div className={styles.effects}>
    { renderEffectsList() }
    { renderAddedEffect() }
    { renderAddingEffectButtons() }
  </div>
}
