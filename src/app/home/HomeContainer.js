import { connect } from 'react-redux'
import HomeComponent from './HomeComponent'
import { appActions } from '../duck'

const mapDispatchToProps = dispatch => {
  const makeThemeDark = () => dispatch(appActions.makeThemeDark())
  return {
    makeThemeDark
  }
}

const HomeContainer = connect(
  null,
  mapDispatchToProps
)(HomeComponent)

export default HomeContainer
