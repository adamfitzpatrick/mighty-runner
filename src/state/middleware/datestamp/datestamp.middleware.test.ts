import datestampMiddleware from './datestamp.middleware'
import { Dispatch, AnyAction, Action as ReduxAction, MiddlewareAPI } from 'redux'
import { AppState } from '@state/default-state'
import { ActiveCharacterAction, Action } from '@state/actions'
import { CharacterIdentifier } from '@models'

describe('datestamp middleware', () => {
  let dispatchSpy: Dispatch<AnyAction>
  let appState: AppState
  let middlewareAPI: MiddlewareAPI<Dispatch<AnyAction>>
  let next: Dispatch<AnyAction>
  let sut: (action: ReduxAction<ActiveCharacterAction>) => void

  beforeEach(() => {
    dispatchSpy = jest.fn()
    appState = {
      activeCharacter: { updated: 1 }
    } as AppState
    middlewareAPI = {
      getState: () => appState,
      dispatch: dispatchSpy
    }
    next = jest.fn()
    sut = datestampMiddleware(middlewareAPI)(next)
  })

  test('should modify the updated value on a character to be saved', () => {
    const now = new Date().getTime() - 1
    const action = {
      type: ActiveCharacterAction.SAVE_CHARACTER
    }
    sut(action)
    expect(next).toHaveBeenCalledWith(action)
    const dispatchedAction: Action<ActiveCharacterAction, CharacterIdentifier> = (dispatchSpy as jest.Mock).mock.calls[0][0]
    expect(dispatchedAction.payload.updated).toBeGreaterThan(now)
  })
})
