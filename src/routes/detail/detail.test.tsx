import * as React from 'react'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'
import { character } from '../../../test-fixtures/character'
import Detail from '.'
import { AppState } from '@state/default-state'
import { CharacterIdentifier, PersonalData } from '@models'
import { match } from 'react-router'
import { History, Location } from 'history'
import { cleanup } from '@testing-library/react'

describe('Detail container', () => {
  let appState: AppState
  let sut: RenderWithRedux

  function doRender (state: AppState) {
    const routeMatch = { params: { characterId: '1' } } as match<{ characterId: string}>
    const history = {} as History<any>
    const location = {} as Location<any>
    return renderWithRedux(<Detail match={routeMatch} history={history} location={location}/>, state)
  }

  beforeEach(() => {
    appState = {
      activeCharacter: character as CharacterIdentifier,
      personalData: {} as PersonalData
    } as AppState
    sut = doRender(appState)
  })

  test('should render correctly with the correct active character state', () => {
    expect(sut.container.innerHTML).toContain('class=\"detail\"')
    expect(sut.queryByTestId('detail.1')).toBeDefined()
  })

  test('should display a loader if an active character does not exist', () => {
    cleanup()
    sut = doRender({} as AppState)
    expect(sut.container.innerHTML).toContain('Loading')
  })

  test('should display a loader if the appState contains the incorrect character', () => {
    cleanup()
    appState.activeCharacter!.id = '2'
    sut = doRender(appState)
    expect(sut.container.innerHTML).toContain('Loading')
  })
})
