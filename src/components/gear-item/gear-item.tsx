import * as React from 'react'

import * as styles from './gear-item.scss'
import * as Models from '@models'
import { EditItemRenderProp } from '@components/edit-item'
import { EffectsById } from '@containers/effects'
import Button from '@components/button'
import Input from '@components/input'

interface Props {
  item: Models.GearItem
  edit: (item: Models.GearItem) => void
}

export default function GearItem ({ item, edit }: Props) {
  return (
    <div data-testid={ `${item.name}.gear-item.component` }>
      <h3>{ item.name }</h3>
      <div>Description: { item.description }</div>
      <div>Cost: { item.cost }</div>
      <div>Rating: { item.value && item.value.rating }</div>
      <div>Availability: { item.availability }</div>
      <div>Effects:</div>
      <EffectsById ids={ item.effects! } />
      <Button label='Edit' onClick={ () => edit(item) } />
    </div>
  )
}

export const GearItemEditRender: EditItemRenderProp<Models.GearItem> = (item, changeHandler): JSX.Element => {
  const onChangeCreator = (property: keyof Models.GearItem, num?: boolean) => {
    return (value: string) => {
      const parsedValue = num ? parseFloat(value) || 0 : value
      const updated = {
        ...item,
        [property]: parsedValue
      }
      changeHandler(updated)
    }
  }

  const onValueChange = (value: string) => {
    const parsedValue = parseFloat(value) || 0
    const updated = {
      ...item,
      value: {
        rating: parsedValue
      }
    }
    changeHandler(updated)
  }

  return (
    <div data-testid={`${item.id}.gear-item-edit-render.component`}>
      <Input
        type='text'
        label='Name'
        value={ item.name }
        onChange={ onChangeCreator('name') }
      />
      <Input
        type='text'
        label='Description'
        value={ item.description }
        onChange={ onChangeCreator('description') }
      />
      <Input
        type='number'
        label='Cost'
        value={ item.cost }
        onChange={ onChangeCreator('cost', true) }
      />
      <Input
        type='text'
        label='Availability'
        value={ item.availability }
        onChange={ onChangeCreator('availability') }
      />
      <Input
        type='text'
        label='Rating'
        value={ item.value.rating }
        onChange={ onValueChange }
      />
    </div>
  )
}
