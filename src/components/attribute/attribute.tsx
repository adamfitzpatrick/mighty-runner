import * as React from 'react'

import * as styles from './attribute.scss'
import * as Models from '@models'
import { EditItemRenderProp } from '@components/edit-item'
import Effect from '@components/effect'
import { EffectsByTarget } from '@containers/effects'
import EffectiveStat from '@containers/effective-stat'

interface Props {
  attribute: Models.Attribute
  edit: () => void
}

export default function Attribute ({ attribute, edit }: Props) {

  return (
    <div>
      <div>
        <h3>{ attribute.name } ({attribute.shortName})</h3>
        <div>
          <span>
            Effective Value:
            <EffectiveStat
              baseValue={attribute.value.chargen + attribute.value.initial}
              target={attribute.asEffectTarget}
            />
          </span>
          <button onClick={edit}>Edit</button>
        </div>
        <EffectsByTarget target={attribute.asEffectTarget} />
      </div>
    </div>
  )
}

export const AttributeEditRender: EditItemRenderProp<Models.Attribute> = (attribute, changeHandler) => {
  const onValuePropertyChangeCreator = (property: keyof Models.StatValue) => {
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
