import { connect } from 'react-redux'
import HomeComponent from './HomeComponent'
import { appActions } from '../duck'

const mapDispatchToProps = dispatch => ({
  makeThemeLight: () => dispatch(appActions.makeThemeLight())
})

const HomeContainer = connect(
  null,
  mapDispatchToProps
)(HomeComponent)

export default HomeContainer
