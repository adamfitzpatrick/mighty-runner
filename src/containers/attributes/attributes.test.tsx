import * as React from 'react'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'
import { fireEvent, cleanup } from '@testing-library/react'
import Attributes from '.'
import * as Models from '@models'
import { AppState } from '@state/default-state'

describe('Attributes container', () => {
  let attributes: Models.Attributes
  let effects: Models.Effect[]
  let appState: AppState
  let sut: RenderWithRedux

  beforeEach(() => {
    attributes = {
      body: {
        id: 'body',
        name: 'Body',
        shortName: 'bod',
        description: 'd',
        asEffectTarget: [ 'attributes', 'body' ],
        value: { initial: 0, chargen: 6 },
        maximum: 6
      },
      agility: {
        id: 'agility',
        name: 'Agility',
        shortName: 'agi',
        description: 'd',
        asEffectTarget: [ 'attributes', 'agility' ],
        value: { initial: 0, chargen: 6 },
        maximum: 6
      },
      reaction: {
        id: 'reaction',
        name: 'Reaction',
        shortName: 'rea',
        description: 'd',
        asEffectTarget: [ 'attributes', 'reaction' ],
        value: { initial: 0, chargen: 6 },
        maximum: 6
      },
      strength: {
        id: 'strength',
        name: 'Strength',
        shortName: 'str',
        description: 'd',
        asEffectTarget: [ 'attributes', 'strength' ],
        value: { initial: 0, chargen: 6 },
        maximum: 6
      },
      logic: {
        id: 'logic',
        name: 'Logic',
        shortName: 'log',
        description: 'd',
        asEffectTarget: [ 'attributes', 'logic' ],
        value: { initial: 0, chargen: 6 },
        maximum: 6
      },
      willpower: {
        id: 'willpower',
        name: 'Willpower',
        shortName: 'wil',
        description: 'd',
        asEffectTarget: [ 'attributes', 'willpower' ],
        value: { initial: 0, chargen: 6 },
        maximum: 6
      },
      intuition: {
        id: 'intuition',
        name: 'Intuition',
        shortName: 'int',
        description: 'd',
        asEffectTarget: [ 'attributes', 'intuition' ],
        value: { initial: 0, chargen: 6 },
        maximum: 6
      },
      charisma: {
        id: 'charisma',
        name: 'Charisma',
        shortName: 'cha',
        description: 'd',
        asEffectTarget: [ 'attributes', 'charisma' ],
        value: { initial: 0, chargen: 6 },
        maximum: 6
      },
      essence: {
        id: 'essence',
        name: 'Essence',
        shortName: 'ess',
        description: 'd',
        asEffectTarget: [ 'attributes', 'essence' ],
        value: { initial: 0, chargen: 6 },
        maximum: 6
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
      attributes,
      effects
    } as AppState
    sut = renderWithRedux(<Attributes />, appState)
  })

  test('should render correctly', () => {
    expect(sut.container.innerHTML).toMatchSnapshot()
  })

  test('should not throw an error if the redux state is missing', () => {
    cleanup()
    delete appState.attributes
    sut = renderWithRedux(<Attributes />, appState)
    expect(sut.container.innerHTML).toMatchSnapshot()
  })

  describe('editing', () => {
    let editButton

    beforeEach(() => {
      editButton = sut.getAllByTestId('Edit.button.component')[0]
      fireEvent.click(editButton)
    })

    test('should show the edit component when the edit button is clicked', () => {
      expect(sut.getByTestId('Body.edit-item.component')).toBeDefined()
    })

    test('should update local state on edit-item field changes', () => {
      const input = sut.getByTestId('Maximum.input.component') as HTMLInputElement
      fireEvent.change(input, { target: { value: '3' } })
      expect(input.value).toEqual('3')
    })

    test('should update the attributes when editing is finished', () => {
      const doneButton = sut.getByTestId('Done.button.component')
      fireEvent.click(doneButton)
      expect(sut.dispatchSpy.mock.calls[0][0].type).toEqual('UPDATE_ATTRIBUTE')
    })
  })

})
