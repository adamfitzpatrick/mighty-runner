import * as React from 'react'
import { Character } from '@models'

import * as styles from './character-form-mock.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@state/initial-state'
import { loadCharacterCreator } from '@state/actions'
import { RouteComponentProps } from 'react-router'

import PersonalData from '@containers/personal-data'
import Attributes from '@containers/attributes'
import Gear from '@containers/gear'

type CharacterFormMockProps = RouteComponentProps<{ characterId: string }>

function immutablyCopyCharacter (character: Character): Character {
  return JSON.parse(JSON.stringify(character))
}

function recurseObjectToUpdateValue (obj: { [key: string]: any }, path: string[], value: any) {
  if (path.length === 1) {
    obj[path[0]] = value
    return
  } else {
    const newPath = ([] as string[]).concat(path)
    const newObj = obj[newPath.shift()!]
    recurseObjectToUpdateValue(newObj, newPath, value)
  }
}

function modifyCharacterValue (
  character: Character,
  path: string | string[],
  value: any
): Character {
  const newChar = immutablyCopyCharacter(character)
  if (typeof path === 'string') {
    (newChar as { [key: string]: any })[path] = value
  } else {
    recurseObjectToUpdateValue(newChar, path, value)
  }
  return newChar
}

export default function CharacterFormMock (props: CharacterFormMockProps) {
  const activeCharacter = useSelector((state: AppState) => state.activeCharacter)
  const dispatch = useDispatch()

  if (!activeCharacter) {
    loadCharacterCreator(dispatch)(props.match.params.characterId)
    return <div>no data</div>
  }
/*
  const updateCharacterCreator = (path: string | string[], isNumber?: boolean) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      let value: number | string | boolean = isNumber ? parseFloat(event.target.value) || 0 : event.target.value
      let action = setActiveCharacterCreator(dispatch)
      if (event.target.type === 'checkbox') {
        value = event.target.checked
        action = saveCharacterCreator(dispatch)
      }
      action(modifyCharacterValue(activeCharacter, path, value))
    }
  }

  const blurHandler = () => {
    saveCharacterCreator(dispatch)(activeCharacter)
  }

  const renderEditableArray = (arr: (string | number)[], arrayPath: string[]) => {
    return arr.map((element, index) => {
      return (
        <input
          key={index}
          value={element}
          onChange={updateCharacterCreator(arrayPath.concat(index.toString()))}
          onBlur={blurHandler}
        />
      )
    })
  }

  const renderEffectFullDetailElements = (effect: Effect, index: number) => {
    return (
      <span>
        <span>Target: </span>
        { renderEditableArray(effect.target, [ 'effects', index.toString(), 'target' ]) }
      </span>
    )
  }

  const renderEffect = (effect: Effect, full?: boolean) => {
    const index = activeCharacter.effects.findIndex(eff => effect.id === eff.id)
    return (
      <div key={index}>
        <span>id: {effect.id}</span>
        <label>
          <span>Name</span>
          <input
            value={effect.name}
            onChange={updateCharacterCreator([ 'effects', index.toString(), 'name' ])}
            onBlur={blurHandler}
          />
        </label>
        <label>
          <span>Active</span>
          <input
            type='checkbox'
            checked={effect.active}
            onChange={updateCharacterCreator([ 'effects', index.toString(), 'active' ])}
          />
        </label>
        <label>
          <span>Value</span>
          <input
            value={effect.value}
            onChange={updateCharacterCreator([ 'effects', index.toString(), 'value' ], true)}
            onBlur={blurHandler}
          />
        </label>
        { full ? renderEffectFullDetailElements(effect, index) : null }
      </div>
    )
  }

  const renderAttribute = (attribute: Attribute) => {
    if (!attribute) { return null }
    const applicableEffects = activeCharacter.effects.filter(effect => {
      return effect.target.every((part, index) => part === attribute.asTarget[index])
    })

    const modifier = applicableEffects.filter(effect => effect.active).reduce((sum, effect) => sum + effect.value, 0)

    return (
      <div>
        <div>
          <h3>{ attribute.name } ({attribute.shortName})</h3>
          <label>
            <span>Maximum</span>
            <input
              value={attribute.maximum}
              onChange={updateCharacterCreator(attribute.asTarget.concat('maximum'), true)}
              onBlur={blurHandler}
            />
          </label>
          <label>
            <span>Initial Value</span>
            <input
              value={attribute.value.initial}
              onChange={updateCharacterCreator(attribute.asTarget.concat(['value', 'initial']), true)}
              onBlur={blurHandler}
            />
          </label>
          <label>
            <span>Chargen Value</span>
            <input
              value={attribute.value.chargen}
              onChange={updateCharacterCreator(attribute.asTarget.concat(['value', 'chargen']), true)}
              onBlur={blurHandler}
            />
          </label>
          <span>
            Effective Value: { attribute.value.initial + attribute.value.chargen + modifier }
          </span>
        </div>
        <div>
          <h4>Applicable Effects</h4>
          { applicableEffects.map(effect => renderEffect(effect)) }
        </div>
      </div>
    )
  }

  const renderAttributes = (attributes: Attributes) => {
    return (
      <div>
        <h2>Attributes</h2>
        <div>{ renderAttribute(attributes.body) }</div>
        <div>{ renderAttribute(attributes.agility) }</div>
        <div>{ renderAttribute(attributes.reaction) }</div>
        <div>{ renderAttribute(attributes.strength) }</div>
        <div>{ renderAttribute(attributes.willpower) }</div>
        <div>{ renderAttribute(attributes.logic) }</div>
        <div>{ renderAttribute(attributes.intuition) }</div>
        <div>{ renderAttribute(attributes.charisma) }</div>
      </div>
    )
  }

  const renderSpecialAttributes = (specialAttributes: SpecialAttributes) => {
    if (!specialAttributes) { return null }
    return (
      <div>
        <h2>Special Attributes</h2>
        <div>{ renderAttribute(specialAttributes.edge) }</div>
        <div>{ renderAttribute(specialAttributes.magic) }</div>
        <div>{ renderAttribute(specialAttributes.resonance) }</div>
      </div>
    )
  }

  const renderGearItem = (item: Gear, index: number) => {
    return (
      <div key={item.id}>
        <label>
          <span>Id</span>
          <input
            value={item.id}
            onChange={updateCharacterCreator([ 'gear', index.toString(), 'id' ])}
            onBlur={blurHandler}
          />
        </label>
        <label>
          <span>Name</span>
          <input
            value={item.name}
            onChange={updateCharacterCreator([ 'gear', index.toString(), 'name' ])}
            onBlur={blurHandler}
          />
        </label>
        <label>
          <span>Description</span>
          <input
            value={item.description}
            onChange={updateCharacterCreator([ 'gear', index.toString(), 'description' ])}
            onBlur={blurHandler}
          />
        </label>
        <label>
          <span>Cost</span>
          <input
            value={item.cost}
            onChange={updateCharacterCreator([ 'gear', index.toString(), 'cost' ])}
            onBlur={blurHandler}
          />
        </label>
        <label>
          <span>Availability</span>
          <input
            value={item.availability}
            onChange={updateCharacterCreator([ 'gear', index.toString(), 'availability' ])}
            onBlur={blurHandler}
          />
        </label>
        <span>Effects</span>
        { renderEditableArray(item.effects, [ 'gear', index.toString(),' effects' ]) }
      </div>
    )
  }

  const renderGear = (gear: Gear[]) => {
    return (
      <div>
        <h2>Gear</h2>
        {gear.map(renderGearItem)}
      </div>
    )
  }

  const renderEffects = (effects: Effect[]) => {
    return (
      <div>
        <h2>Effects</h2>
        { effects.map(effect => renderEffect(effect, true)) }
      </div>
    )
  } */

  return (
    <div className={styles.characterForm}>
      <div>
        <span>userId</span>
        <strong>{activeCharacter.userId}</strong>
      </div>
      <div>
        <span>id</span>
        <strong>{activeCharacter.id}</strong>
      </div>
      <PersonalData />
      <Attributes />
      <Gear />
    </div>
  )
}
