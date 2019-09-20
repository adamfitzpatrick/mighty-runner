import * as React from 'react'
import { EffectsById, EffectsByTarget } from '.'
import { cleanup } from '@testing-library/react'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'
import { Effect } from '@models'
import { AppState } from '@state/default-state'
import { fireEvent } from '@testing-library/dom'

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

    beforeEach(() => {
      sut = renderWithRedux(<EffectsById ids={[ '1', '3' ]} />, appState)
    })

    it('should render correctly', () => {
      expect(sut.container.innerHTML).toMatchSnapshot()
      expect(sut.getAllByTestId('editable-effect.component').length).toBe(2)
    })

    it('should correctly handle missing data', () => {
      cleanup()
      sut = renderWithRedux(<EffectsById ids={[ '1' ]} />, { effects: null } as AppState)
      expect(sut.container.innerHTML).toMatchSnapshot()
    })
  })

  describe('EffectsByTarget', () => {
    let sut: RenderWithRedux

    beforeEach(() => {
      sut = renderWithRedux(<EffectsByTarget target={[ 'a', 'c' ]} />, appState)
    })

    it('should render correctly', () => {
      expect(sut.container.innerHTML).toMatchSnapshot()
      expect(sut.getAllByTestId('non-editable-effect.component').length).toBe(1)
    })

    it('should handle toggling the active state of an effect', () => {
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

    it('should correctly handle missing data', () => {
      cleanup()
      sut = renderWithRedux(<EffectsByTarget target={[ 'a', 'b' ]} />, { effects: null } as AppState)
      expect(sut.container.innerHTML).toMatchSnapshot()
    })
  })
})
