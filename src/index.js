import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'
import createStore from './store/createStore'
import './index.scss'

/**
 * * Store Initialization
 */
const store = createStore(window.__INITIAL_STATE__)

/**
 * * Render Setup
 */
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  ReactDOM.render(<App store={store} />, MOUNT_NODE)
}

/**
 * * Development Tools
 */
if (module.hot) {
  const renderApp = render
  const renderError = error => {
    const RedBox = require('redbox-react').default

    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
  }

  render = () => {
    try {
      renderApp()
    } catch (e) {
      console.error(e)
      renderError(e)
    }
  }

  /** Setup HMR */
  module.hot.accept(['./app/App'], () => {
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render()
    })
  })
}

/**
 * * Let's have some fun
 */
if (!__TEST__) render()
