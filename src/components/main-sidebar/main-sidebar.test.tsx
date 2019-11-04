import * as React from 'react'
import { render } from '@testing-library/react'
import MainSidebar from '.'
import { Character } from '@models'

describe('MainSidebar component', () => {
  test('render with provided data', () => {
    let sut = render(
      <MainSidebar
        count={16}
        favorite={favorite}
        newest={newest}
        recent={recent}
      />)
    expect(sut.container.innerHTML).toContain('foo')
  })
})
