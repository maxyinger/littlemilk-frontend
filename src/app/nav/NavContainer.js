import { connect } from 'react-redux'
import NavComponent from './NavComponent'

const mapStateToProps = state => {
  const { theme } = state.app
  return {
    theme
  }
}

/**
 * pure: false needed because of connect
 * complications with withRouter() and posed()
 */
const NavContainer = connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(NavComponent)

export default NavContainer
