import * as React from 'react'

import * as styles from './gear.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@state/default-state'
import GearItem, { GearItemEditRender } from '@components/gear-item'
import * as Models from '@models'
import EditItem from '@components/edit-item'
import { updateGearCreator } from '@state/actions/gear.actions'
import { saveCharacterCreator, updateEffectCreator } from '@state/actions'

interface State {
  itemToEdit: Models.GearItem | null
}

export default function Gear () {
  const gear = useSelector((state: AppState) => state.gear)
  const dispatch = useDispatch()
  const updateGear = updateGearCreator(dispatch)
  const saveCharacter = saveCharacterCreator(dispatch)
  const [state, setState] = React.useState({ itemToEdit: null } as State)

  if (!gear) { return null }

  const edit = (item: Models.GearItem) => setState({ itemToEdit: item })
  const done = () => {
    updateGear(state.itemToEdit!)
    saveCharacter()
    setState({ itemToEdit: null })
  }

  return (
    <div>
      <h2>Gear</h2>
      {
        gear.map(item => {
          return <GearItem
            key={item.id}
            item={item}
            edit={ edit }
          />
        })
      }
      <EditItem item={state.itemToEdit} render={GearItemEditRender} changeHandler={edit} done={done} />
    </div>
  )
}
