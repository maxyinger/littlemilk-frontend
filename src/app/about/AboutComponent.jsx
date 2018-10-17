import React, { Component } from 'react'
import Stream from '../common/Stream'
import AWrap from '../common/AWrap'
import './About.scss'

class AboutComponent extends Component {
  render () {
    return (
      <div className="i">
        <div className="i-stream-wrap">
          <Stream speed={2.6}>
            <h1 className="i-header">LITTLEMILK.STUDIO @</h1>
          </Stream>
          <Stream speed={4.2}>
            <h1 className="i-header">LITTLEMILK.STUDIO @</h1>
          </Stream>
          <Stream speed={6}>
            <h1 className="i-header">LITTLEMILK.STUDIO @</h1>
          </Stream>
          <Stream speed={3.1}>
            <h1 className="i-header">LITTLEMILK.STUDIO @</h1>
          </Stream>
          <Stream speed={2.1}>
            <h1 className="i-header">LITTLEMILK.STUDIO @ </h1>
          </Stream>
        </div>
        <article className="i-info">
          <p className="i-bio">
            <span className="i-bio-head">PROFILE </span>
            <br />
            Creative Web Studio of Max Yinger.
            <br />
            Interaction Design / Development.
            <br />
            Fort Collins, CO.
            <br />
          </p>
          <ul className="i-socials">
            <li className="i-social">
              <AWrap href="#">github</AWrap>
            </li>
            <li className="i-social">
              <AWrap href="#">codepen</AWrap>
            </li>
            <li className="i-social">
              <AWrap href="#">dribbble</AWrap>
            </li>
            <li className="i-social">
              <AWrap href="#">Get In Touch</AWrap>
            </li>
          </ul>
        </article>
      </div>
    )
  }
}

export default AboutComponent
