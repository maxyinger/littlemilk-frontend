import React, { Component } from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'
import { transform } from 'popmotion'

const Surp = posed.h1({
  mount: {
    color: '#00ff00'
  },
  enter: {
    color      : '#ff0000',
    blook      : () => 1,
    delay      : 2000,
    transition : { duration: 2000 }
  },
  exit: {
    color      : '#0000ff',
    blook      : () => 0,
    transition : { duration: 2000 }
  }
})

class HomeComponent extends Component {
  componentDidMount () {
    this.props.makeThemeLight()
  }

  render () {
    return (
      <div>
        {/* <hWebGL /> */}
        {/* <indexer /> */}
        <div className="h-article-wrap">
          <article />
          <Surp>Home!</Surp>
        </div>
      </div>
    )
  }
}

// const HomeComponent = () => (
//   <div>
//     {/* <hWebGL /> */}
//     {/* <indexer /> */}
//     <div className="h-article-wrap">
//       <article />
//       <Emitter onPoseComplete={() => console.log('homeComplete!')}>
//         Home!
//       </Emitter>
//     </div>
//   </div>
// )

HomeComponent.propTypes = {
  makeThemeLight: PropTypes.func.isRequired
}

export default HomeComponent
