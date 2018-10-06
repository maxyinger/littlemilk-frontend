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
    // console.log(this.container.current.textContent)
    if (this.container.current) {
      // const innerText = this.container.current.textContent
      // const charArray = innerText.split('')
      // this.container.current.innerHTML = charArray.reduce(
      //   (innerHTML, char) => innerHTML + `<span>${char}</span>`
      // )
      // const bb = this.container.current.getBoundingClientRect().height
      // const lh = parseInt(
      //   window.getComputedStyle(this.container.current).lineHeight,
      //   10
      // )
      // const fs = parseInt(
      //   window.getComputedStyle(this.container.current).fontSize,
      //   10
      // )
      // console.log(fs)
      // console.log(bb)
      // console.log(lh)
      // console.log(JSON.stringify(this.container.current.innerHTML))
      // console.log(Math.floor(bb / lh))
    }
    this.convertTolines()
  }

  convertTolines () {
    const container = this.container.current
    const spaceChar = this.spaceChar.current
    if (container && spaceChar) {
      // Create an array of words and their widths from character nodes.
      const charNodes = Array.from(container.children)
      const { words } = charNodes.reduce(
        (scope, charNode, i, charNodes) => {
          /**
           * If its a space, push the current word and reset it,
           * else add char to currWord.
           */
          if (charNode.textContent === ' ') {
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
      console.log(words)

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
          spaceCharWidth : spaceChar.getBoundingClientRect().width + 5,
          containerWidth : container.getBoundingClientRect().width
        }
      )

      // Set state with lines.
      this.setState({ lines })
    }
  }

  render () {
    const { children } = this.props
    return (
      <React.Fragment>
        <div
          style={{
            position : 'absolute',
            display  : 'inline-block',
            opacity  : 0
          }}
          ref={this.spaceChar}
        >
          {' '}
        </div>
        <div ref={this.container} className="lineSplit">
          {this.state.lines.length > 0
            ? this.state.lines.map(line => <div key={line}>{line}</div>)
            : children.split('').map((char, i) => <span key={i}>{char}</span>)}
        </div>
      </React.Fragment>
    )
  }
}

SplitLines.propTypes = {
  children: PropTypes.string.isRequired
}

export default SplitLines
