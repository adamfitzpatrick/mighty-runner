import { h } from 'preact'
import { shallow } from 'preact-render-spy'
import Stat from '.'

describe('stat component', () => {
  describe('when not provided with a "round" prop', () => {
    it('should render with a specified label and value', () => {
      const stat = shallow(<Stat label='label' value='value' />)
      expect(stat).toMatchSnapshot()
    })
  })

  describe('when provided with a "round" prop', () => {
    it('should render the specified label and value with round styles', () => {
      const stat = shallow(<Stat label='label' value='value' round />)
      expect(stat).toMatchSnapshot()
    })
  })
})
