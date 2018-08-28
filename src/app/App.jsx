import React from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { TransitionGroup, Transition } from 'react-transition-group'

/**
 * * Routes
 * */
import Home from './home'
import Contact from './contact'
import FourOhFour from './common/FourOhFour'

function App ({ store }) {
  return (
    <Provider store={store}>
      <Router>
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <Transition key={location.key} timeout={1000}>
                <Switch location={location}>
                  <Route path="/" exact component={Home} />
                  <Route path="/contact" component={Contact} />
                  <Route component={FourOhFour} />
                </Switch>
              </Transition>
            </TransitionGroup>
          )}
        />
      </Router>
    </Provider>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
