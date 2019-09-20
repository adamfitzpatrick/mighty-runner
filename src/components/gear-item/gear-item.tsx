import * as React from 'react'

import * as styles from './gear-item.scss'
import * as Models from '@models'
import { EditItemRenderProp } from '@components/edit-item'
import { Effects } from '@containers/effects'

interface Props {
  item: Models.GearItem
  edit: (item: Models.GearItem) => void
}

export default function GearItem ({ item, edit }: Props) {

  return (
    <div>
      <div>
        <h3>{ item.name }</h3>
        <div>Description: { item.description }</div>
        <div>Cost: { item.cost }</div>
        <div>Availability: { item.availability }</div>
        <div>Effects:</div>
        <Effects effectIds={item.effects} />
        <button onClick={ () => edit(item) }>Edit</button>
      </div>
    </div>
  )
}

export const GearItemEditRender: EditItemRenderProp<Models.GearItem> = (item, changeHandler) => {
  const onChangeCreator = (property: keyof Models.GearItem, num?: boolean) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = num ? parseFloat(event.target.value) || 0 : event.target.value
      const updated = {
        ...item,
        [property]: value
      }
      changeHandler(updated)
    }
  }

  return (
    <div>
      <label>
        <span>Name</span>
        <input
          value={item.name}
          onChange={onChangeCreator('name')}
        />
      </label>
      <label>
        <span>Description</span>
        <input
          value={item.description}
          onChange={onChangeCreator('description')}
        />
      </label>
      <label>
        <span>Cost</span>
        <input
          value={item.cost}
          onChange={onChangeCreator('cost', true)}
        />
      </label>
      <label>
        <span>Availability</span>
        <input
          value={item.availability}
          onChange={onChangeCreator('availability')}
        />
      </label>
    </div>
  )
}
