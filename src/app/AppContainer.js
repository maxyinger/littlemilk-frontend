import { connect } from 'react-redux'
import AppComponent from './AppComponent'
import { appActions } from './duck'

const mapStateToProps = state => {
  const { theme, noCursor } = state.app
  return {
    theme,
    noCursor
  }
}

const mapDispatchToProps = dispatch => ({
  startExitTransition  : () => dispatch(appActions.startExitTransition()),
  startEnterTransition : () => dispatch(appActions.startEnterTransition()),
  endTransition        : () => dispatch(appActions.endTransition()),
  toggleCursor         : () => dispatch(appActions.toggleCursor())
})

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent)

export default AppContainer
