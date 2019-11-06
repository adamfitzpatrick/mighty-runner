import { pic as picReducer } from './pic.reducer'
import { PicAction } from '@state/actions'
import { Pic } from '@models'

describe('pic reducer', () => {
  let pic: Pic
  let state: Pic | null | undefined

  beforeEach(() => {
    pic = {
      url: 'url'
    } as Pic
    state = null
  })

  describe('with undefined state', () => {
    state = undefined
    const action = {
      type: 'NOT_AN_ACTION' as PicAction,
      payload: pic
    }
    expect(picReducer(state, action)).toEqual(null)
  })

  describe('SET_PIC', () => {
    test('should return the payload', () => {
      const action = {
        type: PicAction.SET_PIC,
        payload: pic
      }
      expect(picReducer(state, action)).toEqual(pic)
    })
  })
})
