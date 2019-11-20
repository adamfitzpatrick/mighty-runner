import * as React from 'react'
import { cleanup, render } from '@testing-library/react'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'
import Landing from '.'

describe('Landing container', () => {
  test('should do nothing', () => {
    expect(true).toEqual(true)
  })
})
