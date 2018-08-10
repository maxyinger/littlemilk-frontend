import React from 'react'
import { mount, shallow } from 'enzyme'

import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<MyComponent debug />)
    expect(component).toMatchSnapshot()
  })

  it('should render correctly with no props', () => {
    const component = shallow(<MyComponent />)
    expect(component).toMatchSnapshot()
  })

  it('should render banner text correctly with given strings', () => {
    const strings = ['one', 'two']
    const component = shallow(<MyComponent list={strings} />)
    expect(component).toMatchSnapshot()
  })

  it('should be possible to activate button with Spacebar', () => {
    const component = mount(<MyComponent />)
    component
      .find('button#my-button-one')
      .simulate('keydown', { keyCode: 32 })

    expect(component).toMatchSnapshot()
    component.unmount()
  })

  it('should be possible to activate button 2 with Spacebar', () => {
    const component = mount(<MyComponent />)
    component
      .find('button#my-button-two')
      .simulate('keydown', { keyCode: 32 })

    expect(component).toMatchSnapshot()
    component.unmount()
  })
})
