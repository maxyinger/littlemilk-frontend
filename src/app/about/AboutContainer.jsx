import { connect } from 'react-redux'
import AboutComponent from './AboutComponent'
import { appActions } from '../duck'

const mapDispatchToProps = dispatch => ({
  makeThemeDark: () => dispatch(appActions.makeThemeDark())
})

const AboutContainer = connect(
  null,
  mapDispatchToProps
)(AboutComponent)

export default AboutContainer
