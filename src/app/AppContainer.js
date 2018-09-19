import { connect } from 'react-redux'
import AppComponent from './AppComponent'

const mapStateToProps = state => {
  const { theme } = state.app
  return {
    theme
  }
}

const mapDispatchToProps = () => ({})

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent)

export default AppContainer
