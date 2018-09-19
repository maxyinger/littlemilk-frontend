import React from 'react'
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
import NavContainer from './nav/NavContainer'
import { tween } from 'popmotion'

const RoutesContainer = posed.div({})

const AppComponent = ({ theme }) => (
  <Router>
    <div className={theme === 'light' ? 'theme--light' : 'theme--dark'}>
      <NavContainer />
      <main className="routes">
        <Route
          render={({ location }) => (
            <PoseGroup>
              <RoutesContainer key={location.key}>
                <Switch location={location}>
                  <Route path="/" exact component={Home} />
                  <Route path="/contact" component={Contact} />
                  <Route component={FourOhFour} />
                </Switch>
              </RoutesContainer>
            </PoseGroup>
          )}
        />
      </main>
      <CursorContainer />
    </div>
  </Router>
)

AppComponent.propTypes = {
  theme: PropTypes.string.isRequired
}

export default AppComponent
