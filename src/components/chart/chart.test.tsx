import * as React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Chart from '.'
import { DataPoint } from './chart'

describe('Chart component', () => {
  let data: DataPoint[]
  let sut: RenderResult

  beforeEach(() => {
    data = [
      [ 'a', 1 ],
      [ 'b', 2 ],
      [ 'c', 3 ]
    ] as DataPoint[]
    sut = render(<Chart data={data} />)
  })

  test('should render correctly', () => {
    expect(sut.container.innerHTML).toContain('<div class=\"chart\"')
  })

  test('should render with no background', () => {
    sut = render(<Chart data={data} bare />)
    expect(sut.container.innerHTML).toContain('<div class=\"chart bare\"')
  })
})
