import * as React from 'react'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'
import Attribute, { AttributeEditRender } from '.'
import { AppState } from '@state/default-state'
import * as Models from '@models'
import { fireEvent, render, RenderResult } from '@testing-library/react'

describe('Attribute component', () => {
  let appState: AppState
  let agility: Models.Attribute
  let effects: Models.Effect[]

  beforeEach(() => {
    agility = {
      id: 'agility',
      name: 'Agility',
      shortName: 'agi',
      description: 'd',
      asEffectTarget: [ 'attributes', 'agility' ],
      maximum: 6,
      value: {
        initial: 1,
        chargen: 1
      }
    }
    effects = [{
      id: '1',
      name: 'n',
      description: 'd',
      target: [ 'attributes', 'agility' ],
      value: 1,
      active: true
    }]
    appState = {
      attributes: {
        agility
      },
      effects
    } as AppState
  })

  describe('display component', () => {
    let sut: RenderWithRedux
    let editSpy: jest.Mock<Models.Attribute>

    beforeEach(() => {
      editSpy = jest.fn()
      sut = renderWithRedux(<Attribute
        attribute={ agility }
        edit={ editSpy }
      />, appState)
    })

    test('should render correctly', () => {
      expect(sut.container.innerHTML).toMatchSnapshot()
    })

    test('should contain the correct effective value', () => {
      const statDisplay = sut.getByTestId('attributes.agility.effective-stat.container')
      expect(statDisplay.innerHTML).toBe('3')
    })

    test('should call the edit handler when the edit button is clicked', () => {
      const button = sut.getByTestId('Edit.button.component')
      fireEvent.click(button)
      expect(editSpy).toHaveBeenCalledWith(agility)
    })
  })

  describe('edit component', () => {
    let sut: RenderResult
    let changeSpy: jest.Mock<Models.Attribute>

    beforeEach(() => {
      changeSpy = jest.fn()
      sut = render(AttributeEditRender(agility, changeSpy))
    })

    test('should render correctly', () => {
      expect(sut.container.innerHTML).toMatchSnapshot()
    })

    test('should call the change handler on a change to the maximum field', () => {
      const input = sut.getByTestId('Maximum.input.component')
      fireEvent.change(input, { target: { value: '3' } })
      agility.maximum = 3
      expect(changeSpy).toHaveBeenCalledWith(agility)
    })

    test('should call the change handler on a value input change', () => {
      const input = sut.getByTestId('Chargen.input.component')
      fireEvent.change(input, { target: { value: '10' } })
      agility.value.chargen = 10
      expect(changeSpy).toHaveBeenCalledWith(agility)
    })
  })
})
