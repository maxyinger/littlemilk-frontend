import React from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import AppContainer from './AppContainer'
import './App.scss'

const App = ({ store }) => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
