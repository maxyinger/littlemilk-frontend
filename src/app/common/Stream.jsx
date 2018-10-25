import React, { PureComponent } from 'react'
import posed from 'react-pose'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StreamFrame = styled.div`
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  right: 0;
  left: 0;
`

const StreamInner = styled(
  posed.div({
    streaming: {
      applyAtStart: {
        x: '0%'
      },
      x          : ({ translateX }) => translateX,
      transition : ({ speed }) => ({
        type     : 'tween',
        ease     : 'linear',
        duration : speed * 20000,
        loop     : Infinity
      })
    },
    still: {
      x: '0%'
    }
  })
)`
  display: inline-block;
`

class Stream extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      numClones: 1
    }
    this.streamFrame = React.createRef()
  }

  componentDidMount () {
    this.updateNumClones()
    window.addEventListener('resize', () => this.updateNumClones)
  }

  // updateNumClones :: _ -> _
  updateNumClones = () => {
    // Update stream to propper number of clones.
    const { current: streamFrame } = this.streamFrame
    if (streamFrame) {
      const { width: frameWidth } = streamFrame.getBoundingClientRect()
      const {
        width: childWidth
      } = streamFrame.firstChild.getBoundingClientRect()
      const numClones = Math.ceil(frameWidth / childWidth) * 2

      // Start streaming.
      this.setState({ numClones })
    }
  }

  render () {
    const { children, speed } = this.props
    const { numClones } = this.state
    const streamInnerClones = Array(numClones)
      .fill(0) // js only allows map if array items aren't empty.
      .map((_, i) => (
        <StreamInner
          key={i}
          initialPose="still"
          speed={speed}
          pose={numClones > 1 ? 'streaming' : 'still'}
          translateX={`${(numClones * -100) / 2}%`}
        >
          {children}
        </StreamInner>
      ))
    return <StreamFrame ref={this.streamFrame}>{streamInnerClones}</StreamFrame>
  }
}

Stream.propTypes = {
  children : PropTypes.node.isRequired,
  speed    : PropTypes.number
}

Stream.defaultProps = {
  speed: 2
}

export default Stream
