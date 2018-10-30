// import './utils/normalize'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'
import createStore from './store/createStore'
import Snif from './utils/snif'
import { ErrorOldBrowser, ErrorTouchDevice } from './app/common/Error'

/**
 * *Store Initialization
 */
const store = createStore(window.__INITIAL_STATE__)

/**
 * *Render Setup
 */
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  if (Snif.isIEolderThan11) {
    ReactDOM.render(<ErrorOldBrowser />, MOUNT_NODE)
  } else if (Snif.isTouch) {
    ReactDOM.render(<ErrorTouchDevice />, MOUNT_NODE)
  } else {
    ReactDOM.render(<App store={store} />, MOUNT_NODE)
  }
}

/**
 * *Development Tools
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
 * *Let's have some fun
 */
if (!__TEST__) render()
