import React from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import config from './App.config.js'

/**
 * * Routes
 */
import Home from './home/HomeContainer'
import About from './about/AboutContainer'
import FourOhFour from './common/FourOhFour'

/**
 * * App Components
 */
import CursorContainer from './cursor/CursorContainer'
import NavContainer from './nav/NavContainer'

const TransitionController = posed.div({
  mount: {
    progress: 0
  },
  enter: {
    progress   : 1,
    delay      : config.pageTransitionTime,
    transition : { duration: config.pageTransitionTime }
  },
  exit: {
    progress   : 2,
    transition : { duration: config.pageTransitionTime }
  }
})

const backgroundProps = {
  themeLight: {
    backgroundColor : config.colors.offWhite,
    delay           : config.pageTransitionTime,
    transition      : { duration: config.pageTransitionTime }
  },
  themeDark: {
    backgroundColor : config.colors.black,
    transition      : { duration: config.pageTransitionTime }
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

const AppComponent = ({
  theme,
  startExitTransition,
  startEnterTransition,
  endTransition,
  toggleCursor,
  noCursor,
  stickyIndex,
  isExitTransition
}) => (
  <Router>
    <div
      onMouseMove={({ target }) => {
        console.log(target)
        if (target.classList.contains('no-cursor') && !noCursor) toggleCursor()
        if (!target.classList.contains('no-cursor') && noCursor) toggleCursor()
      }}
      className={
        `app ${theme === 'light' ? 'theme--light ' : 'theme--dark '}` +
        (stickyIndex >= 0 && !isExitTransition ? 'pointer ' : '')
      }
    >
      <Background pose={theme === 'light' ? 'themeLight' : 'themeDark'} />
      <NavContainer />
      <main className="routes-wrap">
        <Route
          render={({ location }) => (
            <PoseGroup flipMove={false} preEnterPose="mount">
              <TransitionController
                className="routes-controller"
                onValueChange={{
                  progress: v => {
                    /**
                     * First re-render from prop change causing
                     * onValue change to fire once per frame even
                     * though value doesn't change. Causing sticky
                     * to not work on first second
                     */
                    if (v === 0) startExitTransition()
                    if (v === 1) endTransition()
                    if (v === 2) startEnterTransition()
                  }
                }}
                key={location.pathname}
              >
                <Switch location={location}>
                  <Route path="/" exact component={Home} key="home" />
                  <Route path="/info" component={About} key="about" />
                  <Route component={FourOhFour} key="fourOhFour" />
                </Switch>
              </TransitionController>
            </PoseGroup>
          )}
        />
      </main>
      <CursorContainer />
    </div>
  </Router>
)

AppComponent.propTypes = {
  theme                : PropTypes.string.isRequired,
  startExitTransition  : PropTypes.func.isRequired,
  startEnterTransition : PropTypes.func.isRequired,
  endTransition        : PropTypes.func.isRequired,
  toggleCursor         : PropTypes.func.isRequired,
  noCursor             : PropTypes.bool.isRequired,
  stickyIndex          : PropTypes.number.isRequired,
  isExitTransition     : PropTypes.bool.isRequired
}

export default AppComponent
