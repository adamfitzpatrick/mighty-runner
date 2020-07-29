import * as React from 'react'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'
import Detail from '.'
import { AppState } from '@state/default-state'
import { CharacterIdentifier, PersonalData, Attributes, Pic, SpecialAttributes, GearItem, Effect } from '@models'
import { match } from 'react-router'
import { DetailProps } from './detail'

describe('Detail container', () => {
  let appState: AppState
  let props: DetailProps
  let sut: RenderWithRedux

  beforeEach(() => {
    props = {
      match: {
        params: {
          characterId: '1'
        },
        isExact: true,
        path: '',
        url: ''
      }
    } as DetailProps
    appState = {
      characters: [],
      activeCharacter: { id: '1', userId: 'u' } as CharacterIdentifier,
      pic: {} as Pic,
      personalData: {} as PersonalData,
      attributes: {} as Attributes,
      specialAttributes: {} as SpecialAttributes,
      gear: [] as GearItem[],
      effects: [] as Effect[],
      apiError: false
    } as AppState

    sut = renderWithRedux(<Detail {...props} />, appState)
  })

  test('should do nothing', () => {
    expect(sut.container.innerHTML).toContain('class=\"detail\"')
  })
})
