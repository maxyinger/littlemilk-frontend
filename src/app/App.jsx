import React from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

/**
 * * Routes
 */
import Home from './home'
import Contact from './contact'
import FourOhFour from './common/FourOhFour'

/**
 * * App Components
 */
import CursorContainer from './cursor/CursorContainer'
import NavComponent from './nav/NavComponent'
import { tween } from 'popmotion'

const RoutesContainer = posed.div({
  enter: {
    opacity    : 1,
    delay      : 8000,
    transition : props => tween({ ...props, duration: 8000 })
  },
  exit: {
    opacity    : 0,
    delay      : 300,
    transition : props => tween({ ...props, duration: 8000 })
  }
})

const BG = posed.div({
  enter: {
    backgroundColor : '#1c1c1a',
    delay           : 8000,
    transition      : props => tween({ ...props, duration: 8000 })
  },
  exit: {
    backgroundColor : '#ffffff',
    delay           : 300,
    transition      : props => tween({ ...props, duration: 8000 })
  }
})

function App ({ store }) {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <div className="routes">
            <Route
              render={({ location }) => (
                <PoseGroup>
                  <RoutesContainer key={location.key}>
                    <Switch location={location}>
                      <Route path="/" exact component={Home} />
                      <Route path="/contact" component={Contact} />
                      <Route component={FourOhFour} />
                      <Route path="/" component={BG} />
                    </Switch>
                  </RoutesContainer>
                </PoseGroup>
              )}
            />
          </div>
          <NavComponent />
          <CursorContainer />
        </React.Fragment>
      </Router>
    </Provider>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
