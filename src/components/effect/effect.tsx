import * as React from 'react'

import * as styles from './effect.scss'

import * as Models from '@models'
import Input from '@components/input'
import ArrayInput from '@components/array-input'
import Button from '@components/button'
import { array } from 'prop-types'

interface NonEditableProps {
  effect: Models.Effect
  onToggle: (effect: Models.Effect) => void
}

interface EditableProps {
  effect: Models.Effect
  onChange: (effect: Models.Effect) => void
  onRemove?: (effect: Models.Effect) => void
  onBlur?: () => void
}

export default function Effect (props: NonEditableProps | EditableProps) {
  const nonEditableProps = props as NonEditableProps
  const editableProps = props as EditableProps

  const onToggleHandler = (active: boolean) => {
    const updated = { ...props.effect, active }
    nonEditableProps.onToggle(updated)
  }

  const onChangeCreator = (property: keyof Models.Effect) => {
    return (value: any) => {
      editableProps.onChange({ ...props.effect, [property]: value })
    }
  }

  const onTargetAdd = () => {
    const target = props.effect.target.concat('')
    const updated = { ...props.effect, target }
    editableProps.onChange(updated)
  }

  function renderNonEditable (effect: Models.Effect) {
    return (
      <div data-testid='non-editable-effect.component'>
        <span>Name: { props.effect.name }</span>
        <Input
          type='checkbox'
          label='Active'
          value={ effect.active }
          onChange={ onToggleHandler }
        />
      </div>
    )
  }

  function renderEditable (effect: Models.Effect) {
    const handleBlur = () => {
      editableProps.onBlur && editableProps.onBlur()
    }

    return (
      <div data-testid='editable-effect.component'>
        <Input
          type='text'
          label='Name'
          value={ effect.name }
          onChange={ onChangeCreator('name') }
          onBlur={ handleBlur }
        />
        <Input
          type='text'
          label='Description'
          value={ effect.description }
          onChange={ onChangeCreator('description') }
          onBlur={ handleBlur }
        />
        <ArrayInput
          label='Target'
          arr={ effect.target }
          onChange={ onChangeCreator('target') }
          onAdd={onTargetAdd}
          onBlur={ handleBlur }
        />
        <Input
          type='number'
          label='Value'
          value={ effect.value }
          onChange={ onChangeCreator('value') }
          onBlur={ handleBlur }
        />
        <Input
          type='checkbox'
          label='Active'
          value={ effect.active }
          onChange={ onChangeCreator('active') }
        />
        {
          editableProps.onRemove ?
          <Button
            label='Delete Effect'
            onClick={() => editableProps.onRemove!(effect)}
          /> :
          null
        }
      </div>
    )
  }

  if (nonEditableProps.onToggle) {
    return renderNonEditable(props.effect)
  } else {
    return renderEditable(props.effect)
  }
}
