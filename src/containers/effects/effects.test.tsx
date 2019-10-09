import * as React from 'react'
import { EffectsById, EffectsByTarget } from '.'
import { cleanup } from '@testing-library/react'
import { within, fireEvent } from '@testing-library/dom'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'
import { Effect } from '@models'
import { AppState } from '@state/default-state'
import { EffectsAction } from '@state/actions'

describe('Effects containers', () => {
  let effects: Effect[]
  let appState: AppState

  beforeEach(() => {
    effects = [{
      id: '1',
      name: 'a',
      description: 'd',
      target: [ 'a', 'b' ],
      active: false,
      value: 1
    }, {
      id: '2',
      name: 'b',
      description: 'd',
      target: [ 'a', 'c' ],
      active: true,
      value: 2
    }, {
      id: '3',
      name: 'c',
      description: 'd',
      target: [ 'a', 'b' ],
      active: false,
      value: 3
    }]
    appState = {
      effects
    } as AppState
  })

  describe('EffectsById', () => {
    let sut: RenderWithRedux
    let onAdd: (effect: Effect) => void

    beforeEach(() => {
      onAdd = jest.fn()
    })

    test('should render correctly when not editing', () => {
      sut = renderWithRedux(<EffectsById ids={[ '1', '3' ]} />, appState)
      expect(sut.getAllByTestId('non-editable-effect.component').length).toBeGreaterThan(1)
    })

    test('should render correctly when editing', () => {
      sut = renderWithRedux(<EffectsById ids={[ '1', '3' ]} edit />, appState)
      expect(sut.getAllByTestId('editable-effect.component').length).toBeGreaterThan(1)
    })

    test('should correctly handle missing data', () => {
      sut = renderWithRedux(<EffectsById ids={[ '1' ]} />, { effects: null } as AppState)
      expect(sut.container.innerHTML).toBe('')
    })

    test('should dispatch an action to remove the effect when a delete button is clicked', () => {
      sut = renderWithRedux(<EffectsById ids={[ '1' ]} edit onAdd={onAdd} />, appState)
      const button = sut.getByTestId('Delete Effect.button.component')
      fireEvent.click(button)
      expect(sut.dispatchSpy).toHaveBeenCalledWith({
        payload: effects[0],
        type: 'REMOVE_EFFECT'
      })
    })

    describe('for adding effects', () => {
      beforeEach(() => {
        sut = renderWithRedux(<EffectsById ids={[ '1', '3' ]} edit onAdd={onAdd}/>, appState)
        const addButton = sut.getByTestId('Add Effect.button.component')
        fireEvent.click(addButton)
      })

      test('should add an effect for editing', () => {
        expect(sut.getAllByTestId('editable-effect.component').length).toBe(3)
        expect(sut.dispatchSpy).not.toHaveBeenCalled()
      })

      test('should remove the add button while one effect is being added', () => {
        expect(sut.queryByTestId('Add Effect.button.component')).toBeNull()
      })

      test('should save the effect with any changes to application state on done', () => {
        const blankEffect = sut.getAllByTestId('editable-effect.component')[2]
        const nameInput = within(blankEffect).getByTestId('Name.input.component')
        fireEvent.change(nameInput, { target: { value: 'effect' } })
        const doneButton = sut.getByTestId('Done Adding Effect.button.component')
        fireEvent.click(doneButton)
        expect(sut.dispatchSpy).toHaveBeenCalledWith({
          type: EffectsAction.ADD_EFFECT,
          payload: expect.objectContaining({
            name: 'effect'
          })
        })
        expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({ name: 'effect' }))
      })

      test('should discard the effect on cancel', () => {
        const cancelButton = sut.getByTestId('Cancel Adding Effect.button.component')
        fireEvent.click(cancelButton)
        expect(sut.dispatchSpy).not.toHaveBeenCalled()
        expect(sut.getAllByTestId('editable-effect.component').length).toBe(2)
      })
    })
  })

  describe('EffectsByTarget', () => {
    let sut: RenderWithRedux

    beforeEach(() => {
      sut = renderWithRedux(<EffectsByTarget target={[ 'a', 'c' ]} />, appState)
    })

    test('should render correctly', () => {
      expect(sut.getAllByTestId('non-editable-effect.component').length).toBe(1)
    })

    test('should handle toggling the active state of an effect', () => {
      const input = sut.getAllByTestId('Active.input.component')[0]
      const event = {
        bubbles: true,
        target: {
          checked: true
        }
      }
      fireEvent(input, new MouseEvent('click', event))
      effects[1].active = false
      expect(sut.dispatchSpy).toHaveBeenCalledWith({
        type: 'UPDATE_EFFECT',
        payload: effects[1]
      })
    })

    test('should correctly handle missing data', () => {
      cleanup()
      sut = renderWithRedux(<EffectsByTarget target={[ 'a', 'b' ]} />, { effects: null } as AppState)
      expect(sut.container.innerHTML).toBe('')
    })
  })
})
