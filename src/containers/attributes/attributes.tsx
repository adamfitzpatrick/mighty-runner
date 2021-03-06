import * as React from 'react'

import * as styles from './attributes.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@state/default-state'

import * as Models from '@models'
import { updateAttributeCreator, saveCharacterCreator, updateEffectCreator } from '@state/actions'
import Attribute, { AttributeEditRender } from '@components/attribute'
import EditItem from '@components/edit-item'

interface State {
  attributeToEditName: string | null
  attributeToEdit: Models.Attribute | null
}

export default function Attributes () {
  const attributes = useSelector((state: AppState) => state.attributes)

  const [state, setState] = React.useState<State>({
    attributeToEditName: null,
    attributeToEdit: null
  })

  const dispatch = useDispatch()
  const updateAttribute = updateAttributeCreator(dispatch)
  const saveCharacter = saveCharacterCreator(dispatch)

  if (!attributes) { return null }

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
    <div className={styles.attributes}>
      <h2>Attributes</h2>
      <Attribute
        attribute={ attributes.body }
        edit={ editAttributeCreator('body', attributes.body) }
      />
      <Attribute
        attribute={ attributes.agility }
        edit={ editAttributeCreator('agility', attributes.agility) }
      />
      <Attribute
        attribute={ attributes.reaction }
        edit={ editAttributeCreator('reaction', attributes.reaction) }
      />
      <Attribute
        attribute={ attributes.strength }
        edit={ editAttributeCreator('strength', attributes.strength) }
      />
      <Attribute
        attribute={ attributes.willpower }
        edit={ editAttributeCreator('willpower', attributes.willpower) }
      />
      <Attribute
        attribute={ attributes.logic }
        edit={ editAttributeCreator('logic', attributes.logic) }
      />
      <Attribute
        attribute={ attributes.intuition }
        edit={ editAttributeCreator('intuition', attributes.intuition) }
      />
      <Attribute
        attribute={ attributes.charisma }
        edit={ editAttributeCreator('charisma', attributes.charisma) }
      />
      <Attribute
        attribute={ attributes.essence }
        edit={ editAttributeCreator('essence', attributes.essence) }
      />
      {
        state.attributeToEdit ?
          <EditItem
            item={state.attributeToEdit}
            render={AttributeEditRender}
            changeHandler={changeHandler}
            done={finishEdit}
          /> :
          null
      }
    </div>
  )
}
