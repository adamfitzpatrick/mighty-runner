import * as React from 'react'
import { render, RenderResult } from '@testing-library/react'
import ShowStat from '.'

describe('ShowStat component', () => {
  let sut: RenderResult

  function doRender(value?: number | string) {
    return render(<ShowStat value={value as (number | string)} label='stat' />)
  }

  test('should display the stat and label', () => {
    sut = doRender(1)
    expect(sut.container.innerHTML).toContain('<div class=\"showStat\"')
  })

  test('should incorporate any provided css classes', () => {
    sut = render(<ShowStat value={1} label='stat' classes={'cssClass1'} />)
    expect(sut.container.innerHTML).toContain('cssClass1')
    sut = render(<ShowStat value={1} label='stat' classes={[ 'cssClass1', 'cssClass2' ]} />)
    expect(sut.container.innerHTML).toContain('cssClass1 cssClass2')
  })

  test('should render dashes in place of a non-zero falsy value', () => {
    sut = doRender('')
    expect(sut.container.innerHTML).toContain('>--<')
    sut = doRender()
    expect(sut.container.innerHTML).toContain('>--<')
  })

  test('should render a zero value as given', () => {
    sut = doRender(0)
    expect(sut.container.innerHTML).toContain('>0<')
  })
})
