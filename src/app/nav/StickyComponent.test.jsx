import React from 'react'
import { shallow } from 'enzyme'
import { NavLink } from 'react-router-dom'
import StickyComponent from './StickyComponent'

describe('<StickyComponent />', () => {
  let props
  let mountedStickyComponent

  beforeEach(() => {
    props = {
      to          : 'path',
      exact       : false,
      index       : 1,
      makeSticky  : jest.fn(),
      breakSticky : jest.fn(),
      sticky      : -1
    }
    mountedStickyComponent = shallow(
      <StickyComponent {...props}>
        <span>test</span>
      </StickyComponent>
    )
  })

  it('renders a <NavLink>', () => {
    expect(mountedStickyComponent.find(NavLink)).toHaveLength(1)
  })
})
