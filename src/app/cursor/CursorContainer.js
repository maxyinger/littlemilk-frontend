import { connect } from 'react-redux'
import CursorComponent from './CursorComponent'

const mapStateToProps = state => {
  const { stickyPoint, canDrag } = state.app
  return {
    canDrag,
    stickyPoint
  }
}

const mapDispatchToProps = () => ({})

const CursorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CursorComponent)

export default CursorContainer
