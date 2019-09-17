import * as React from 'react'

import * as styles from './input.scss'

export type InputType = 'text' | 'number' | 'checkbox'

interface Props {
  label: string
  value: string | number | boolean
  type: InputType
  onChange: (value: string | number | boolean) => void
  onBlur: () => void
}

export default function Input ({ label, value, type, onChange, onBlur }: Props) {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'checkbox') {
      onChange(event.target.checked)
    } else if (type === 'number') {
      onChange(parseFloat(event.target.value) || 0)
    } else {
      onChange(event.target.value)
    }
  }

  return (
    <label>
        <span>{ label }</span>
        <input
          data-testid={`${label}.input.component`}
          type={ type === 'number' ? 'text' : type }
          value={ typeof value === 'boolean' ? undefined : value }
          checked={ typeof value === 'boolean' ? value : undefined }
          onChange={ changeHandler }
          onBlur={ onBlur }
        />
      </label>
  )
}
