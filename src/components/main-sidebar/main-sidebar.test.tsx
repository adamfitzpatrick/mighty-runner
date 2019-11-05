import * as React from 'react'
import { render } from '@testing-library/react'
import MainSidebar from '.'
import { Character } from '@models'

describe('MainSidebar component', () => {
  test('render with provided data', () => {
    let favorite = { id: '1', personalData: { name: 'Favorite' } } as Character
    let newest = { id: '2', personalData: { name: 'Newest' } } as Character
    let recent = [
      favorite,
      newest,
      { id: '3', personalData: { name: 'This One' } },
      { id: '4', personalData: { name: 'That One' } },
      { id: '5', personalData: { name: 'T\'Other One' } }
    ] as Character[]
    let sut = render(
      <MainSidebar
        count={16}
        favorite={favorite}
        newest={newest}
        recent={recent}
      />)
    expect(sut.container.innerHTML).toContain('<div class=\"mainSidebar\">')
  })
})
