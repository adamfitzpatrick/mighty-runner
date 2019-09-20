import * as React from 'react'
import * as shortId from 'shortid'

import * as styles from './array-input.scss'

type ArrayAsInput = (string | number)[]

interface Props {
  label: string
  arr: ArrayAsInput
  onChange: (arr: ArrayAsInput) => void
  onBlur: () => void
}

export default function ArrayInput ({ label, arr, onChange, onBlur }: Props) {
  const changeHandlerCreator = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [ ...arr ]
    updated[index] = event.target.value
    onChange(updated)
  }

  const additionalElementRender = (value: string | number, index: number) => {
    return (
      <label key={ shortId.generate() }>
        <span className={styles.additionalLabel}>{ label }</span>
        <input
          data-testid={`${index + 1}.array.input`}
          type='text'
          value={ value }
          onChange={ changeHandlerCreator(index + 1) }
          onBlur={ onBlur }
        />
      </label>
    )
  }

  return (
    <React.Fragment>
      <label>
        { label }
        <input
          data-testid='0.array.input'
          type='text'
          value={ arr[0] }
          onChange={ changeHandlerCreator(0) }
          onBlur={ onBlur }
        />
      </label>
      { arr.slice(1).map(additionalElementRender) }
    </React.Fragment>
  )
}
