import * as React from 'react'

import * as styles from './attributes.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@state/initial-state'

import * as Models from '@models'
import { updateAttributeCreator, saveCharacterCreator, updateEffectCreator } from '@state/actions'
import Attribute, { AttributeEditRender } from '@components/attribute'
import EditItem from '@components/edit-item'

interface State {
  attributeToEditName: string | null
  attributeToEdit: Models.Attribute | null
}

function effectFilterer (targetAttribute: string) {
  return (effect: Models.Effect) => {
    return effect.target[0] === 'attributes' && effect.target[1] === targetAttribute
  }
}

export default function Attributes () {
  const attributes = useSelector((state: AppState) => state.attributes)
  const effects = useSelector((state: AppState) => state.effects) || []

  const [state, setState] = React.useState<State>({
    attributeToEditName: null,
    attributeToEdit: null
  })

  const dispatch = useDispatch()
  const updateAttribute = updateAttributeCreator(dispatch)
  const saveCharacter = saveCharacterCreator(dispatch)
  const updateEffect = updateEffectCreator(dispatch)

  if (!attributes) { return null }

  const toggleEffect = (effect: Models.Effect) => {
    updateEffect(effect)
    saveCharacter()
  }

  const editAttributeCreator = (name: string, attribute: Models.Attribute) => {
    return () => setState({ attributeToEditName: name, attributeToEdit: attribute })
  }

  const finishEdit = () => {
    updateAttribute(state.attributeToEditName!, state.attributeToEdit!)
    saveCharacter()
    setState({ attributeToEditName: null, attributeToEdit: null })
  }

  const changeHandler = (attribute: Models.Attribute) => {
    return setState({ ...state, attributeToEdit: attribute })
  }

  return (
    <div>
      <h2>Attributes</h2>
      <Attribute
        attribute={attributes.agility}
        relevantEffects={effects.filter(effectFilterer('agility'))}
        updateEffect={toggleEffect}
        edit={ editAttributeCreator('agility', attributes.agility) }
      />
      <EditItem
        item={state.attributeToEdit}
        render={AttributeEditRender}
        changeHandler={changeHandler}
        done={finishEdit}
      />
    </div>
  )
}
