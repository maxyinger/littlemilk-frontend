import { connect } from 'react-redux'
import NavComponent from './NavComponent'

const mapStateToProps = state => {
  const { theme } = state.app
  return {
    theme
  }
}

const NavContainer = connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(NavComponent)

export default NavContainer
