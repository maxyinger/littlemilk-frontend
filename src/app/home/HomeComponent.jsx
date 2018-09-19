import React from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'

class HomeComponent extends React.Component {
  x = 'this thing'
  render () {
    return <div>home</div>
  }
}

// const HomeComponent = ({ makeThemeLight, endTransition }) => (
//   <div className="h">
//     {/* <hWebGL /> */}
//     {/* <indexer /> */}
//     <div className="h-article-wrap">
//       <article />
//     </div>
//   </div>
// )

HomeComponent.propTypes = {
  makeThemeLight : PropTypes.func.isRequired,
  endTransition  : PropTypes.func.isRequired
}

export default HomeComponent
