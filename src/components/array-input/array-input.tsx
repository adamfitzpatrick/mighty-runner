import * as React from 'react'
import * as shortId from 'shortid'

import * as styles from './array-input.scss'
import Button from '@components/button'

type ArrayAsInput = (string | number)[]
type KeyedArray = [ string, (string | number) ][]
const TABKEY = 9

interface Props {
  label: string
  arr: ArrayAsInput
  onChange: (arr: ArrayAsInput) => void
  onAdd?: () => void
  onBlur: () => void
}

interface State {
  keyedArray: KeyedArray
}

export default function ArrayInput ({ label, arr, onChange, onAdd, onBlur }: Props) {
  const changeHandlerCreator = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [ ...arr ]
    updated[index] = event.target.value
    onChange(updated)
  }

  const additionalElementRender = (value: string | number, index: number, arr: ArrayAsInput) => {
    // Note that using the index as a key here is acceptable because the array
    // will never be filtered or reordered within this component.  Any re-ordering
    // or filtering will occur outside the component and will result in a re-render
    // which would invalidate an internal key ID scheme anyway.
    return (
      <label key={ index }>
        <span className={styles.additionalLabel}>{label}</span>
        <input
          data-testid={`${index + 1}.array.input`}
          type='text'
          value={value}
          onChange={changeHandlerCreator(index + 1)}
          onBlur={onBlur}
        />
      </label>
    )
  }

  return (
    <React.Fragment>
      <label>
        {label}
        <input
          data-testid='0.array.input'
          type='text'
          value={arr[0]}
          onChange={changeHandlerCreator(0)}
          onBlur={onBlur}
        />
      </label>
      { arr.slice(1).map(additionalElementRender) }
      { onAdd ? <Button label='Add Element' onClick={onAdd} /> : null }
    </React.Fragment>
  )
}
