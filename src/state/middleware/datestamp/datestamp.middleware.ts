import { MiddlewareAPI, Dispatch, AnyAction, Action as ReduxAction } from 'redux'
import { ActiveCharacterAction, Action } from '@state/actions'
import { CharacterIdentifier } from '@models'
import { AppState } from '@state/default-state'

function advanceCharacterUpdatedField (
  character: CharacterIdentifier,
  dispatch: Dispatch<Action<ActiveCharacterAction, CharacterIdentifier>>
) {
  const characterCopy = { ...character }
  characterCopy.updated = new Date().getTime()
  dispatch({
    type: ActiveCharacterAction.SET_ACTIVE_CHARACTER,
    payload: characterCopy
  })
}

const datestampMiddleware = (api: MiddlewareAPI<Dispatch<AnyAction>, AppState>) => {
  return (next: Dispatch<AnyAction>) => (action: ReduxAction<ActiveCharacterAction>) => {
    switch (action.type) {
      case ActiveCharacterAction.SAVE_CHARACTER:
        advanceCharacterUpdatedField(api.getState().activeCharacter!, api.dispatch)
    }
    next(action)
  }
}

export default datestampMiddleware
