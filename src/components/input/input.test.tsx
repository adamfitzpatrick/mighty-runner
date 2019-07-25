import { h } from 'preact'
import { shallow } from 'preact-render-spy'
import Input from '.'

describe('Input component', () => {
  it('should render with the provided label & value', () => {
    const input = shallow(<Input label='label' value='value' onChange={() => { /* no-op */ }} />)
    expect(input).toMatchSnapshot()
  })

  it('should call the provided onChange handler when the input is changed', () => {
    const handler = jest.fn()
    const input = shallow(<Input label='label' value='value' onChange={handler} />)
    input.find('input').simulate('change')
    expect(handler).toHaveBeenCalled()
  })
})
