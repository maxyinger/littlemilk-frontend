import React, { Component } from 'react'
import AWrap from '../common/AWrap'
import './About.scss'

class AboutComponent extends Component {
  componentDidMount () {}

  render () {
    return (
      <div className="i">
        <div className="i-stream">
          <h1 className="i-header">@LITTLEMILK.STUDIO</h1>
        </div>
        <article className="i-content">
          <ul className="i-socials">
            <li className="i-social">
              <AWrap href="#">github</AWrap>
            </li>
            <li className="i-social">
              <AWrap href="#">dribbble</AWrap>
            </li>
            <li className="i-social">
              <AWrap href="#">codepen</AWrap>
            </li>
            <li className="i-social">
              <AWrap href="#">Get In Touch</AWrap>
            </li>
          </ul>
          <p className="i-bio">
            Creative Web Studio of Max Yinger.
            <br />
            Interaction Design / Development.
            <br />
            Fort Collins, CO.
            <br />
          </p>
        </article>
      </div>
    )
  }
}

export default AboutComponent
