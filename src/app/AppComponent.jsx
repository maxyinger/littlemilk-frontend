import React from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import config from './App.config.js'

/**
 * * Routes
 */
import Home from './home'
import Contact from './contact'
import About from './about'
import FourOhFour from './common/FourOhFour'

/**
 * * App Components
 */
import CursorContainer from './cursor/CursorContainer'
import NavContainer from './nav/NavContainer'
import { tween } from 'popmotion'

const RoutesContainer = posed.div({
  enter: {
    transition: props =>
      tween({
        ...props,
        duration: config.pageTransitionTime
      })
  },
  exit: {
    transition: props =>
      tween({
        ...props,
        duration: config.pageTransitionTime
      })
  }
})

const backgroundProps = {
  themeLight: {
    backgroundColor : config.colors.offWhite,
    transition      : props =>
      tween({
        ...props,
        duration: config.pageTransitionTime
      })
  },
  themeDark: {
    backgroundColor : config.colors.black,
    transition      : props =>
      tween({
        ...props,
        duration: config.pageTransitionTime
      })
  }
}

const Background = styled(posed.div(backgroundProps))`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
`

const AppComponent = ({ theme, endTransition }) => (
  <Router>
    <div className={theme === 'light' ? 'theme--light' : 'theme--dark'}>
      <Background pose={theme === 'light' ? 'themeLight' : 'themeDark'} />
      <NavContainer />
      <main className="routes">
        <Route
          render={({ location }) => (
            <PoseGroup flipMove={false}>
              <RoutesContainer
                onPoseComplete={endTransition}
                key={location.key}
              >
                <Switch location={location}>
                  <Route path="/" exact component={Home} key="home" />
                  <Route path="/contact" component={Contact} key="contact" />
                  <Route path="/info" component={About} key="about" />
                  <Route component={FourOhFour} key="fourOhFour" />
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
  theme         : PropTypes.string.isRequired,
  endTransition : PropTypes.func.isRequired
}

export default AppComponent
