import '@testing-library/jest-dom/extend-expect'
import * as React from 'react'
import { Provider } from 'react-redux'
import { cleanup, fireEvent } from '@testing-library/react'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'
import * as Models from '@models'
import PersonalData from '.'
import { AppState } from '@state/default-state'

describe('PersonalData container', () => {
  let personalData: Models.PersonalData
  let appState: AppState
  let sut: RenderWithRedux

  beforeEach(() => {
    personalData = {
      name: 'n',
      role: 'r',
      description: 'd',
      metatype: 'm',
      ethnicity: 'e',
      age: 32,
      gender: 'g',
      weight: 'w',
      height: 'h',
      karma: 1,
      notoriety: 2,
      streetCred: 3,
      publicAwareness: 4,
      totalKarma: 5,
      nuyen: 10000,
      lifestyle: 'Low'
    }
    appState = {
      characters: null,
      activeCharacter: null,
      pic: null,
      personalData,
      attributes: null,
      gear: null,
      effects: null,
      apiError: false
    }
    sut = renderWithRedux(<PersonalData />, appState)
  })

  test('should render correctly', () => {
    expect(sut.container.innerHTML).toContain('<div data-testid=\"personal-data.container\"')
  })

  test('should render correctly when there is no personal data to show', () => {
    appState.personalData = null
    sut = renderWithRedux(<PersonalData />, appState)
    expect(sut.container.innerHTML).toBe('')
  })

  test('should render with an empty string in place of an undefined data field', () => {
    delete appState.personalData!.name
    cleanup()
    sut = renderWithRedux(<PersonalData />, appState)
    expect((sut.getByTestId('Name.input.component')as HTMLInputElement).value).toEqual('')
  })

  test('should update the application personalData state on an input change', () => {
    fireEvent.change(sut.getByTestId('Name.input.component'), { target: { value: 'change' } })
    personalData.name = 'change'
    expect(sut.dispatchSpy).toHaveBeenCalledWith({
      type: 'SET_PERSONAL_DATA',
      payload: personalData
    })
  })

  test('should trigger a save of the personalData on input field blur', () => {
    fireEvent.blur(sut.getByTestId('Name.input.component'))
    expect(sut.dispatchSpy).toHaveBeenCalledWith({ type: 'SAVE_CHARACTER' })
  })
})
