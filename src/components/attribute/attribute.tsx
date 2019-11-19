import * as React from 'react'

import * as styles from './attribute.scss'
import * as Models from '@models'
import { EditItemRenderProp } from '@components/edit-item'
import { EffectsByTarget } from '@containers/effects'
import EffectiveStat from '@containers/effective-stat'
import Button from '@components/button'
import Input from '@components/input'

interface Props {
  attribute: Models.Attribute
  edit: (attribute: Models.Attribute) => void
}

export default function Attribute ({ attribute, edit }: Props) {

  return (
    <div className={styles.attribute}>
      <div>
        <h3>{ attribute.name } ({ attribute.shortName })</h3>
        <div>
          <span>
            Effective Value:
            <EffectiveStat
              stat={attribute}
            />
          </span>
          <Button
            label='Edit'
            onClick={ () => edit(attribute) }
          />
        </div>
        <EffectsByTarget target={ attribute.asEffectTarget } />
      </div>
    </div>
  )
}

export const AttributeEditRender: EditItemRenderProp<Models.Attribute> = (attribute, changeHandler) => {
  const onMaximumChange = (value: number) => {
    const updated = {
      ...attribute,
      maximum: value
    }
    changeHandler(updated)
  }

  const onValuePropertyChangeCreator = (property: keyof Models.StatValue) => {
    return (value: number) => {
      const updated = {
        ...attribute,
        value: { ...attribute.value, [property]: value }
      }
      changeHandler(updated)
    }
  }

  return (
    <div>
      <h3>{ attribute.name }</h3>
      <Input
        type='number'
        label='Maximum'
        value={ attribute.maximum }
        onChange={ onMaximumChange }
      />
      <Input
        type='number'
        label='Initial Value'
        value={ attribute.value.initial }
        onChange={ onValuePropertyChangeCreator('initial') }
      />
      <Input
        type='number'
        label='Chargen'
        value={ attribute.value.chargen }
        onChange={ onValuePropertyChangeCreator('chargen') }
      />
    </div>
  )
}
