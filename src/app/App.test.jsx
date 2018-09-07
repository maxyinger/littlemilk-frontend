import React from 'react'
import { mount } from 'enzyme'
import App from './App'

// describe('App', () => {
//   let props
//   let mountedApp
//   const mountApp = () => {
//     if (!mountedApp) {
//       mountedApp = mount(
//         <App {...props} />
//       )
//     }
//     return mountedApp
//   }

//   beforeEach(() => {
//     props = {
//       prop: undefined
//     }
//     mountedApp = undefined
//   })

//   it('Always renders a div', () => {
//     const divs = mountApp().find('div')
//     expect(divs.length).toBeGreaterThan(0)
//   })

//   it('Renders its children', () => {
//     const divs = mountApp().find('div')
//     const wrappingDiv = divs.first()
//     console.log(wrappingDiv)
//     expect(wrappingDiv.children()).toEqual(mountApp().children())
//   })
// })
