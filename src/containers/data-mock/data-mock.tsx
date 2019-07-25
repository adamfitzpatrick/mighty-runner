import { h, Component } from 'preact'
import { inject } from 'mobx-preact'
import apiService from '@services/api-service'

import * as styles from './data-mock.scss'
import { ActiveCharacterProps } from '@state/active-character-store'

interface Props extends ActiveCharacterProps {}

@inject('activeCharacter')
export default class DataMock extends Component<Props, {}> {
  constructor (props: Props) {
    super(props)
    apiService.getCharacter('1').then(
      character => this.props.activeCharacter!.setActiveCharacter(character),
      err => console.log(err)
    )
  }

  render (props: Props) {
    return <div>DataMock</div>
  }
}
