import { h, Component, Ref } from 'preact'
import { inject } from 'mobx-preact'

import { Expandable, ExpandableGroup } from '@components/expandable'
import PersonalDetail from '@containers/personal-detail'
import { DetailViewProps } from '@state/detail-view-store'

import * as styles from './character-detail.scss'
import AttributesDetail from '@containers/attributes-detail';

interface Props extends DetailViewProps {}

interface State {
  phone: boolean
}

@inject('detailView')
export default class CharacterDetail extends Component<Props, State> {
  state = {
    phone: window.innerWidth < 450
  }
  expandableElement: { base: { childElementCount: number } }

  constructor (props: Props) {
    super(props)
    window.addEventListener('resize', this.handleWindowResize)
  }

  render () {
    return (
      <div className={styles.characterDetail}>
        <ExpandableGroup
          onChildStateChange={this.handleExpandCollapse}
          childStates={this.props.detailView!.activeExpanded}
          className={styles.sectionExpander}
          lockAll={!this.state.phone}
          ref={ref => this.expandableElement = ref}
        >
          <Expandable shadow>
            <h2>Personal Data</h2>
            <PersonalDetail />
          </Expandable>
          <Expandable shadow>
            <h2>Attributes</h2>
            <AttributesDetail />
          </Expandable>
        </ExpandableGroup>
      </div>
    )
  }

  private handleWindowResize = () => {
    this.setState({ phone: window.innerWidth < 450 })
  }

  private handleExpandCollapse = (childStates: boolean[]) => {
    /*
    The following line handles the case where the user's local storage
    has an outdated count of expandables for display.
    */
    const missingExpandables = this.expandableElement.base.childElementCount - childStates.length
    if (missingExpandables > 0) {
      childStates = childStates.concat(new Array(missingExpandables).fill(false))
    }
    this.props.detailView!.activeExpanded = childStates
  }
}
