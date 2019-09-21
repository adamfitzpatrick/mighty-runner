import * as React from 'react'
import { fireEvent, cleanup, render, RenderResult } from '@testing-library/react'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'
import GearItem, { GearItemEditRender } from '.'
import * as Models from '@models'
import { AppState } from '@state/default-state'
import EditItem from '@components/edit-item'

describe('GearItem', () => {
  let appState: AppState
  let gearItem: Models.GearItem
  let effect: Models.Effect

  beforeEach(() => {
    gearItem = {
      id: '1',
      name: 'n',
      shortName: 's',
      description: 'd',
      asEffectTarget: [ 'a', 'b' ],
      effects: [ '1' ],
      cost: 1,
      availability: '6R',
      value: { rating: 3 }
    }
    effect = {
      id: '1',
      name: 'n',
      description: 'd',
      target: [ 'c', 'd' ],
      value: 1,
      active: true
    }
    appState = {
      gear: [ gearItem ],
      effects: [ effect ]
    } as AppState
  })

  describe('display component', () => {
    let sut: RenderWithRedux
    let editSpy: jest.Mock<Models.GearItem>

    beforeEach(() => {
      editSpy = jest.fn()
      sut = renderWithRedux(<GearItem item={ gearItem } edit={ editSpy } />, appState)
    })

    test('should render correctly', () => {
      expect(sut.container.innerHTML).toMatchSnapshot()
    })

    test('should call the edit function when the edit button is clicked', () => {
      const button = sut.getByTestId('Edit.button.component')
      fireEvent.click(button)
      expect(editSpy).toHaveBeenCalled()
    })
  })

  describe('edit component', () => {
    let sut: RenderResult
    let changeSpy: jest.Mock<Models.GearItem>

    beforeEach(() => {
      cleanup()
      changeSpy = jest.fn()
      sut = render(GearItemEditRender(gearItem, changeSpy))
    })

    test('should render correctly', () => {
      expect(sut.container.innerHTML).toMatchSnapshot()
    })

    test('should call the changeHandler on an input change', () => {
      const nameInput = sut.getByTestId('Name.input.component')
      fireEvent.change(nameInput, { target: { value: 'changed' } })
      gearItem.name = 'changed'
      expect(changeSpy).toHaveBeenCalledWith(gearItem)
    })

    test('should gracefully handle a non-numeric input in a numeric field', () => {
      const costInput = sut.getByTestId('Cost.input.component')
      fireEvent.change(costInput, { target: { value: 'nope' } })
      gearItem.cost = 0
      expect(changeSpy).toHaveBeenCalledWith(gearItem)
    })

    describe('value field', () => {
      let ratingInput: HTMLInputElement

      beforeEach(() => { ratingInput = sut.getByTestId('Rating.input.component') as HTMLInputElement })

      test('should handle a change', () => {
        fireEvent.change(ratingInput, { target: { value: '6' } })
        gearItem.value.rating = 6
        expect(changeSpy).toHaveBeenCalledWith(gearItem)
      })

      test('should gracefully handle a non-numeric input', () => {
        fireEvent.change(ratingInput, { target: { value: 'nope' } })
        gearItem.value.rating = 0
        expect(changeSpy).toHaveBeenCalledWith(gearItem)
      })
    })
  })
})
