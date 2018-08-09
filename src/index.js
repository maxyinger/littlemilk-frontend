import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'

/* ====================================
=            Render Setup            =
==================================== */
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  ReactDOM.render(
    <App />,
    MOUNT_NODE
  )
}

/* =========================================
=            Development Tools            =
========================================= */
if (module.hot) {
  const renderApp = render
  const renderError = (error) => {
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

  /* ----------  Setup hot module replacement  ---------- */
  module.hot.accept([
    './app/App'
    // add './routes/index' once we get there
  ], () => {
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render()
    })
  })
}

/* ==========================================
=            Lets have some fun            =
========================================== */
if (!__TEST__) render()
