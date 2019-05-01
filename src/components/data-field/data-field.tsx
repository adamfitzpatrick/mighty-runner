import { h } from 'preact'

import Input from '@components/input'
import { lowProfile } from '@components/input/input.scss';

interface DataFieldProps {
  label: string,
  data: string | number
  onInput?: JSX.EventHandler<InputEvent>
  onChange?: JSX.EventHandler<InputEvent>
  lowProfile?: boolean
}

export default function DataField ({ label, data, onInput, onChange, lowProfile }: DataFieldProps) {
  console.log(label, lowProfile)
  data = data || ''
  return <Input
    label={label}
    value={data.toString()}
    onInput={onInput}
    onChange={onChange}
    disabled={!onInput}
    lowProfile={lowProfile}
  />
}
