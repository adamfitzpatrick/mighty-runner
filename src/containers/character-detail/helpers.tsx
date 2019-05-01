import { h } from 'preact'
import { CharacterModel } from '@assets/models'
import DataField from '@components/data-field'

const getValueOnPath = (currentValue: {[property: string]: any}, path: string) => {
  return currentValue[path] || ' '
}

export function renderDataLine (
  valuePaths: string[],
  character: CharacterModel,
  editing: boolean,
  inputHandlerMaker: (editing: boolean, valuePath: string) => JSX.EventHandler<InputEvent> | undefined,
  changeHandlerMaker: (valuePath: string) => JSX.EventHandler<InputEvent> | undefined,
  lowProfile?: boolean
) {
  return valuePaths.map(valuePath => {
    const valuePathArray = valuePath.split('.')
    const label = valuePathArray[valuePathArray.length - 1].replace(/([A-Z])/g, cap => ` ${cap}`)
    const data = valuePathArray.reduce(getValueOnPath, character)
    const onInput = inputHandlerMaker(editing, valuePath)
    const onChange = changeHandlerMaker(valuePath)
    return <DataField label={label} data={data} onInput={onInput} onChange={onChange} lowProfile={lowProfile} />
  })
}
