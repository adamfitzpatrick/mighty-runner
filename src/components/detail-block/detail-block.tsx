import { h, Component } from 'preact'

import { CharacterProps } from '@state/character-store'
import { renderDataLine } from '@containers/character-detail'
import { CharacterModel } from '@assets/models';

export interface DetailBlockProps extends CharacterProps {}

export interface DetailBlockState {
  editing: boolean
}

export default class DetailBlock extends Component<DetailBlockProps, DetailBlockState> {
  render (props: DetailBlockProps) {
    return <span />
  }

  toggleEditing = () => {
    this.setState((prevState: DetailBlockState) => ({ editing: !prevState.editing }))
  }

  modifyCharacter = (value: string, valuePath: string) => {
    const active = JSON.parse(JSON.stringify(this.props.character!.active))
    const pathArray = valuePath.split('.')
    const maxIndex = pathArray.length - 1
    pathArray.reduce((obj, property, index) => {
      if (!obj[property] && index < maxIndex) {
        obj[property] = {}
      } else if (index === maxIndex) {
        obj[property] = value.trim() || ' '
      }
      return obj[property]
    }, active)
    this.props.character!.active = active
  }

  getInputHandler = (editing: boolean, valuePath: string) => {
    if (!editing) { return }
    return (event: InputEvent) => {
      this.modifyCharacter(event.target.value, valuePath)
    }
  }

  getChangeHandler = (valuePath: string) => {
    return (event: InputEvent) => {
      this.modifyCharacter(event.target.value, valuePath)
      this.props.character!.persistActive()
    }
  }

  dataLineRenderer = (valuePaths: string[], active: CharacterModel, lowProfile?: boolean) => {
    return renderDataLine(valuePaths, active, this.state.editing, this.getInputHandler, this.getChangeHandler, lowProfile)
  }
}
