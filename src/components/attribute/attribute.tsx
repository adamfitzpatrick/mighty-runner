import * as React from 'react'

import * as styles from './attribute.scss'
import * as Models from '@models'
import { EditItemRenderProp } from '@components/edit-item'
import Effect from '@components/effect'

interface Props {
  attribute: Models.Attribute
  relevantEffects: Models.Effect[]
  updateEffect: (effect: Models.Effect) => void
  edit: () => void
}

export default function Attribute ({ attribute, relevantEffects, updateEffect, edit }: Props) {
  const modifiers = relevantEffects
    .filter(effect => effect.active)
    .reduce((sum, effect) => sum + effect.value, 0)

  const onToggleCreator = (effect: Models.Effect) => {
    return (active: boolean) => {
      const updated = { ...effect, active }
      updateEffect(updated)
    }
  }

  return (
    <div>
      <div>
        <h3>{ attribute.name } ({attribute.shortName})</h3>
        <div>
          <span>
            Effective Value: { attribute.value.initial + attribute.value.chargen + modifiers }
          </span>
          <button onClick={edit}>Edit</button>
        </div>
        <div>
          {
            relevantEffects.map(effect => (
              <Effect effect={effect} onToggle={ onToggleCreator(effect) } key={effect.id} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export const AttributeEditRender: EditItemRenderProp = (attribute, changeHandler) => {
  const onValuePropertyChangeCreator = (property: keyof Models.EffectableValue) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const updated = {
        ...attribute,
        value: { ...attribute.value, [property]: parseFloat(event.target.value) || 0 }
      }
      changeHandler(updated)
    }
  }

  return (
    <div>
      <h3>{ attribute.name }</h3>
      <label>
            <span>Initial Value</span>
            <input
              value={attribute.value.initial}
              onChange={onValuePropertyChangeCreator('initial')}
            />
          </label>
    </div>
  )
}
