import { connect } from 'react-redux'
import AppComponent from './AppComponent'
import { appActions } from './duck'

const mapStateToProps = state => {
  const { theme } = state.app
  return {
    theme
  }
}

const mapDispatchToProps = dispatch => {
  const endTransition = () => {
    dispatch(appActions.endTransition())
  }
  return {
    endTransition
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent)

export default AppContainer
