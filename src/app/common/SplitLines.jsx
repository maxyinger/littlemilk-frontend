import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class SplitLines extends Component {
  constructor (props) {
    super(props)
    this.container = React.createRef()
    this.spaceChar = React.createRef()
    this.state = {
      lines: []
    }
  }

  componentDidMount () {
    this.resize = window.listen
    this.convertTolines()
  }

  convertTolines () {
    const container = this.container.current
    if (container) {
      // Create an array of words and their widths from character nodes.
      const charNodes = Array.from(container.children)
      let spaceCharWidth = charNodes[0].getBoundingClientRect().width
      const { words } = charNodes.reduce(
        (scope, charNode, i, charNodes) => {
          /**
           * If its a space, push the current word and reset it,
           * else add char to currWord.
           */
          if (charNode.textContent === ' ') {
            spaceCharWidth = charNode.getBoundingClientRect().width
            scope.words.push(scope.currentWord)
            scope.currentWord = {
              width  : 0,
              string : ''
            }
          } else {
            scope.currentWord.width += charNode.getBoundingClientRect().width
            scope.currentWord.string += charNode.textContent
          }

          // If its the last char, update current word and push it.
          if (i === charNodes.length - 1) {
            scope.words.push(scope.currentWord)
          }

          return scope
        },
        {
          words       : [],
          currentWord : {
            width  : 0,
            string : ''
          }
        }
      )

      // Create array of lines who's widths are less than the containers
      const { lines } = words.reduce(
        (scope, word, i, words) => {
          const { currentLine, spaceCharWidth, containerWidth } = scope
          // If the line doesn't fit, push the current line, and start a new line.
          if (
            currentLine.width + spaceCharWidth + word.width >
            containerWidth
          ) {
            scope.lines.push(scope.currentLine.string)
            scope.currentLine = {
              string : '',
              width  : 0
            }
          }

          // Add the word to the current line.
          scope.currentLine.string += word.string + ' '
          scope.currentLine.width += word.width + spaceCharWidth

          // If its the last word push the current line.
          if (i === words.length - 1) {
            scope.lines.push(scope.currentLine.string)
          }

          return scope
        },
        {
          lines       : [],
          currentLine : {
            string : '',
            width  : 0
          },
          spaceCharWidth : spaceCharWidth,
          containerWidth : container.getBoundingClientRect().width
        }
      )

      // Set state with lines.
      this.setState({ lines })
    }
  }

  render () {
    const { children } = this.props
    const { lines } = this.state
    return (
      <div ref={this.container} className="lineSplit">
        {lines.length > 0
          ? lines.map(line => <div key={line}>{line}</div>)
          : children.split('').map((char, i) => <span key={i}>{char}</span>)}
      </div>
    )
  }
}

SplitLines.propTypes = {
  children: PropTypes.string.isRequired
}

export default SplitLines
