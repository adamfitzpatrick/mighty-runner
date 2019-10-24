import * as React from 'react'
import * as Models from '@models'
import { RenderResult } from '@testing-library/react'
import AddItem from '.'
import { renderWithRedux } from '../../../utils/testing-render-with-redux'
import { AppState } from '@state/default-state'
import { EditItemRenderProp } from '@components/edit-item'

describe('AddItem component', () => {
  let appState: AppState
  let item: Models.Stat
  let changeSpy: jest.Mock<Models.Stat>
  let renderFunc: EditItemRenderProp<Models.Stat>
  let passedObjects: { item?: Models.Stat, changeHandler?: (item: Models.Stat) => void }
  let sut: RenderResult

  beforeEach(() => {
    appState = {} as AppState
    item = {
      id: '1',
      name: 'n',
      shortName: 'n',
      description: 'd',
      value: { thing: 1 },
      asEffectTarget: [ 'a', 'b' ]
    }
    changeSpy = jest.fn()
    renderFunc = (item: Models.Stat, changeHandler: (item: Models.Stat) => void): JSX.Element => {
      passedObjects = { item, changeHandler }
      return <div>ok</div>
    }
    sut = renderWithRedux(<AddItem
      item={ item }
      render={ renderFunc }
      changeHandler={ changeSpy }
      done={ () => { /* no-op */ } }
      cancel={ () => { /* no-op */ } }
    />, appState)
  })

  test('should render correctly', () => {
    expect(sut.container.innerHTML).toMatchSnapshot()
  })

  test('should pass the item and changeHandler into the rendered component', () => {
    expect(passedObjects.item).toBe(item)
    expect(passedObjects.changeHandler).toBe(changeSpy)
  })
})
