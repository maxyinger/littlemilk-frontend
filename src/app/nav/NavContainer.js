import { connect } from 'react-redux'
import NavComponent from './NavComponent'

import { appActions } from '../duck'

const mapStateToProps = state => {
  const { sticky } = state.app
  return {
    sticky
  }
}

const mapDispatchToProps = dispatch => {
  const makeSticky = (index, point) => {
    dispatch(appActions.makeSticky(index, point))
  }
  const breakSticky = () => {
    dispatch(appActions.breakSticky())
  }

  return {
    makeSticky,
    breakSticky
  }
}

const NavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavComponent)

export default NavContainer
