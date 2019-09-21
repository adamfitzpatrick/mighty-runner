import * as React from 'react'
import { cleanup, render, fireEvent } from '@testing-library/react'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'
import EditItem from '.'
import { Stat } from '@models'
import { AppState } from '@state/default-state'

describe('EditItem component', () => {
  let appState: AppState
  let item: Stat
  let changeSpy: jest.Mock<Stat>
  let doneSpy: jest.Mock<undefined>
  let renderFunc: (item: Stat, changeHandler: (item: Stat) => void) => JSX.Element
  let sut: RenderWithRedux

  beforeEach(() => {
    appState = {
      effects: [{
        id: '1',
        name: 'n',
        description: 'd',
        target: [ 'a', 'b' ],
        active: true,
        value: 1
      }]
    } as AppState
    item = {
      id: '1',
      name: 'n',
      shortName: 's',
      description: 'd',
      asEffectTarget: [ 'a', 'b' ],
      effects: [ '1' ],
      value: { thing: 1 }
    }
    changeSpy = jest.fn()
    doneSpy = jest.fn()
    renderFunc = (item: Stat, changeHandler: (item: Stat) => void) => {
      const onChange = () => changeHandler(item)
      return <input
        data-testid='rendered-in-edit-item.input'
        value='value'
        onChange={ onChange }
      />
    }
    sut = renderWithRedux(<EditItem
      item={ item }
      render={ renderFunc }
      changeHandler={ changeSpy }
      done={ doneSpy }
    />, appState)
  })

  test('should render correctly', () => {
    expect(sut.container.innerHTML).toMatchSnapshot()
  })

  test('should pass on the change handler from the parent component', () => {
    const innerInput = sut.getByTestId('rendered-in-edit-item.input')
    fireEvent.change(innerInput, { target: { value: 'change' } })
    expect(changeSpy).toHaveBeenCalled()
  })

  test('should call done when the done button is clicked', () => {
    const button = sut.getByTestId('Done.button.component')
    fireEvent.click(button)
    expect(doneSpy).toHaveBeenCalled()
  })

  test('should render correctly when item has no related effects', () => {
    cleanup()
    delete item.effects
    let noEffects = render(<EditItem
      item={ item }
      render={ renderFunc }
      changeHandler={ changeSpy }
      done={ doneSpy }
    />)
    expect(noEffects.container.innerHTML).toMatchSnapshot()
  })
})
