import { h } from 'preact'
import deep from 'preact-render-spy'
import EditStat from '.'
import { Attribute, Effect } from '@models'

describe('EditStat component', () => {
  let attribute: Attribute
  let effectedBy: Effect[]

  beforeEach(() => {
    attribute = { value: { initial: 1, chargen: 5 }, asTarget: [ 'attributes', 'agility' ] } as Attribute
    effectedBy = [{
      name: 'Effect 1',
      id: '1',
      value: 1,
      active: true,
      target: [ 'attributes', 'agility' ]
    }]
  })

  test('renders the edit-stat modal with the provided statPath', () => {
    const editStat = deep(
      <EditStat attribute={ attribute } effectedBy={effectedBy} effects={[]} />
    )
    expect(editStat).toMatchSnapshot()
  })
})
