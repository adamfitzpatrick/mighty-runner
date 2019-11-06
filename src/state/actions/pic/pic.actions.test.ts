import * as picActions from './pic.actions'
import { AnyAction, Dispatch } from 'redux'
import { Pic } from '@models'

describe('pic actions', () => {
  let dispatchSpy: Dispatch<AnyAction>

  beforeEach(() => {
    dispatchSpy = jest.fn()
  })

  describe('setPicCreator', () => {
    test('should return a function to dispatch the SET_PIC action', () => {
      picActions.setPicCreator(dispatchSpy)({} as Pic)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: picActions.PicAction.SET_PIC,
        payload: {}
      })
    })
  })
})
