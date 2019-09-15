import * as React from 'react'
import * as renderer from 'react-test-renderer'
import Attributes from '.'

describe('Attributes container', () => {
  test('should do nothing', () => {
    const rendered = renderer.create(<Attributes />)
    expect(rendered).toBeTruthy()
  })
})
