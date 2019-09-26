import * as React from 'react'

import * as styles from './gear.scss'
import { useSelector, useDispatch } from 'react-redux'
import { v4 } from 'uuid'

import { AppState } from '@state/default-state'
import GearItem, { GearItemEditRender } from '@components/gear-item'
import * as Models from '@models'
import EditItem from '@components/edit-item'
import { updateGearCreator, addGearCreator } from '@state/actions/gear.actions'
import { saveCharacterCreator } from '@state/actions'
import AddItem from '@components/add-item'
import Button from '@components/button'

interface State {
  itemToEdit: Models.GearItem | null
  addingItem: Models.GearItem | null
}

function generateNewItem (): Models.GearItem {
  const id = v4()
  return {
    id,
    name: '',
    shortName: '',
    description: '',
    cost: 0,
    availability: '',
    value: {
      rating: 0
    },
    asEffectTarget: [ 'gear', id ],
    effects: []
  }
}

export default function Gear () {
  const gear = useSelector((state: AppState) => state.gear)
  const dispatch = useDispatch()
  const updateGear = updateGearCreator(dispatch)
  const addGear = addGearCreator(dispatch)
  const saveCharacter = saveCharacterCreator(dispatch)
  const [state, setState] = React.useState({ itemToEdit: null, addingItem: null } as State)

  if (!gear) { return null }

  const edit = (item: Models.GearItem) => {
    setState({ ...state, itemToEdit: item })
  }

  const add = () => {
    const item = generateNewItem()
    updateAdding(item)
  }

  const updateAdding = (item: Models.GearItem) => {
    setState({ ...state, addingItem: item })
  }

  const doneEditing = () => {
    updateGear(state.itemToEdit!)
    saveCharacter()
    setState({ ...state, itemToEdit: null })
  }

  const doneAdding = () => {
    addGear(state.addingItem!)
    saveCharacter()
    setState({ ...state, addingItem: null })
  }

  const cancelAdd = () => {
    setState({ ...state, addingItem: null })
  }

  return (
    <div>
      <h2>Gear</h2>
      {
        gear.map(item => {
          return <GearItem
            key={ item.id }
            item={ item }
            edit={ edit }
          />
        })
      }
      {
        state.itemToEdit ?
          <EditItem
            item={ state.itemToEdit }
            render={ GearItemEditRender }
            changeHandler={ edit }
            done={ doneEditing }
          /> :
          null
      }
      <Button label={ 'Add' } onClick={ add } />
      {
        state.addingItem ?
          <AddItem
            item={ state.addingItem }
            render={ GearItemEditRender }
            changeHandler={ updateAdding }
            done={ doneAdding }
            cancel={ cancelAdd }
          /> :
          null
      }
    </div>
  )
}
