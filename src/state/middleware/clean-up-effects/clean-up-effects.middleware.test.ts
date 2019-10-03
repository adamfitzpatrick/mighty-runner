import { MiddlewareAPI, Dispatch, AnyAction, Action as ReduxAction } from 'redux'
import cleanUpEffectsMiddleware from './clean-up-effects.middleware'
import { Attributes, Attribute, GearItem } from '@models'
import { AppState } from '@state/default-state'
import { ActiveCharacterAction, GearAction, AttributesAction, Action } from '@state/actions'

describe('clean-up-effects', () => {
  let appState: AppState
  let api: MiddlewareAPI
  let sut: (next: Dispatch<AnyAction>) => (action: AnyAction) => void
  let originatingAction: ReduxAction<ActiveCharacterAction>
  let next: jest.Mock<AnyAction>

  beforeEach(() => {
    appState = {
      attributes: {} as Attributes,
      gear: [] as GearItem[],
      effects: [{
        id: '2'
      }]
    } as AppState
    api = {
      getState: () => appState,
      dispatch: jest.fn()
    } as MiddlewareAPI
    sut = cleanUpEffectsMiddleware(api)
    originatingAction = { type: ActiveCharacterAction.SAVE_CHARACTER }
    next = jest.fn()
  })

  describe('when ActiveCharacterAction.SAVE_CHARACTER is dispatched', () => {
    test('should remove non-existent effect IDs from any attribute that uses them', () => {
      appState.attributes!.body = {
        id: '1',
        effects: [ '1', '2' ]
      } as Attribute
      sut(next)(originatingAction)
      expect(api.dispatch).toHaveBeenCalledWith({
        type: AttributesAction.UPDATE_ATTRIBUTE,
        payload: {
          name: 'body',
          attribute: {
            id: '1',
            effects: [ '2' ]
          }
        }
      })
      expect(next).toHaveBeenCalledWith(originatingAction)
    })

    test('should not update a stat if no there are no non-existent effects referenced', () => {
      appState.attributes!.body = {
        id: '1',
        effects: [ '2' ]
      } as Attribute
      sut(next)(originatingAction)
      expect(api.dispatch).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(originatingAction)
    })

    test('should remove non-existent effect IDs from any gear item that uses them', () => {
      appState.gear!.push({
        id: '1',
        effects: [ '1', '2' ]
      } as GearItem)
      sut(next)(originatingAction)
      expect(api.dispatch).toHaveBeenCalledWith({
        type: GearAction.UPDATE_GEAR,
        payload: {
          id: '1',
          effects: [ '2' ]
        }
      })
      expect(next).toHaveBeenCalledWith(originatingAction)
    })

    test('should handle null states for stats without error', () => {
      appState.gear = null
      appState.attributes = null
      sut(next)(originatingAction)
      expect(api.dispatch).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(originatingAction)
    })

    test('should handle a null effects state without error', () => {
      appState.effects = null
      appState.gear!.push({
        id: '1',
        effects: [ '1', '2' ]
      } as GearItem)
      sut(next)(originatingAction)
      expect(api.dispatch).toHaveBeenCalledWith({
        type: GearAction.UPDATE_GEAR,
        payload: {
          id: '1',
          effects: []
        }
      })
      expect(next).toHaveBeenCalledWith(originatingAction)
    })

    test('should handle a stat with no effects', () => {
      appState.gear!.push({
        id: '1'
      } as GearItem)
      sut(next)(originatingAction)
      expect(api.dispatch).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(originatingAction)
    })
  })

  describe('when any action other than ActiveCharacterAction.SAVE_CHARACTER is dispatched', () => {
    test('should do nothing', () => {
      originatingAction = { type: 'NOT_AN_ACTION' } as ReduxAction
      sut(next)(originatingAction)
      expect(api.dispatch).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(originatingAction)
    })
  })
})
