import * as React from 'react'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'
import Gear from '.'
import { AppState } from '@state/default-state'
import * as Models from '@models'
import { cleanup, fireEvent } from '@testing-library/react'
import { gearItem } from '@components/gear-item/gear-item.scss'

describe('Gear container', () => {
  let appState: AppState
  let gear: Models.GearItem[]
  let effects: Models.Effect[]
  let sut: RenderWithRedux

  beforeEach(() => {
    gear = [{
      id: '1',
      name: 'n',
      shortName: 's',
      description: 'd',
      asEffectTarget: [ 'a', 'b' ],
      effects: [ '1' ],
      cost: 1,
      availability: '6R',
      value: { rating: 3 }
    }]
    effects = [{
      id: '1',
      name: 'n',
      description: 'd',
      target: [ 'c', 'd' ],
      value: 1,
      active: true
    }]
    appState = { gear, effects } as AppState
    sut = renderWithRedux(<Gear />, appState)
  })

  test('should render correctly', () => {
    expect(sut.container.innerHTML).toMatchSnapshot()
  })

  test('should not throw an error if application state is unavailable', () => {
    cleanup()
    delete appState.gear
    sut = renderWithRedux(<Gear />, appState)
    expect(sut.container.innerHTML).toMatchSnapshot()
  })

  describe('editing gear', () => {
    beforeEach(() => {
      const edit = sut.getByTestId('Edit.button.component')
      fireEvent.click(edit)
    })

    test('should add editing component when the edit button is clicked', () => {
      expect(sut.getByTestId('n.edit-item.component')).toBeDefined()
    })

    test('should store changes locally until done button is clicked', () => {
      const name = sut.getAllByTestId('Name.input.component')[0]
      fireEvent.change(name, { target: { value: 'changed' } })
    })

    test('should save changes when the done handler fires', () => {
      const done = sut.getByTestId('Done.button.component')
      fireEvent.click(done)
      expect(() => sut.getByTestId('n.edit-item.component')).toThrow()
      const dispatches = sut.dispatchSpy.mock.calls.map(call => call[0])
      expect(dispatches[0].type).toEqual('UPDATE_GEAR')
      expect(dispatches[1].type).toEqual('SAVE_CHARACTER')
    })
  })

  describe('removing gear', () => {
    test('should remove the specified gearItem', () => {
      const remove = sut.getAllByTestId('Delete.button.component')[0]
      fireEvent.click(remove)
      expect(sut.dispatchSpy).toHaveBeenCalledWith({
        payload: gear[0],
        type: 'REMOVE_GEAR'
      })
      expect(sut.dispatchSpy).toHaveBeenCalledWith({
        type: 'SAVE_CHARACTER'
      })
    })
  })

  describe('adding gear', () => {
    beforeEach(() => {
      const add = sut.getByTestId('Add.button.component')
      fireEvent.click(add)
    })

    test('should add editing component when the add button is clicked', () => {
      expect(sut.getByTestId('.edit-item.component')).toBeDefined()
    })

    test('should store additions locally until done button is clicked', () => {
      const name = sut.getByTestId('Name.input.component')
      fireEvent.change(name, { target: { value: 'changed' } })
      expect(sut.getByTestId('changed.edit-item.component')).toBeDefined()
    })

    test('should not save additions when the cancel button is clicked', () => {
      const cancel = sut.getByTestId('Cancel.button.component')
      fireEvent.click(cancel)
      expect(sut.dispatchSpy).not.toHaveBeenCalled()
    })

    test('should persist additions when the done button is clicked', () => {
      const name = sut.getByTestId('Name.input.component')
      fireEvent.change(name, { target: { value: 'item' } })
      const done = sut.getByTestId('Done.button.component')
      fireEvent.click(done)
      expect(sut.dispatchSpy).toHaveBeenCalledWith({
        payload: expect.objectContaining({
          name: 'item'
        }),
        type: 'ADD_GEAR'
      })
      expect(sut.dispatchSpy).toHaveBeenCalledWith({ type: 'SAVE_CHARACTER' })
    })
  })
})
