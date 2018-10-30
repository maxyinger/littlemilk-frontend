import React from 'react'
import styled from 'styled-components'

const ErrorContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  background-color: #000000;
  color: #ffffff;
  pointer-events: all;
  font-size: 16px;
`

const ErrorWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const ErrorOldBrowser = () => (
  <ErrorContainer>
    <ErrorWrap>
      <p>
        Browser out of date.{' '}
        <a href="https://browser-update.org/update.html" className="copy-link">
          Update Here.
        </a>
      </p>
    </ErrorWrap>
  </ErrorContainer>
)

export const ErrorTouchDevice = () => (
  <ErrorContainer>
    <ErrorWrap>
      <p>Touch device support coming soon.</p>
    </ErrorWrap>
  </ErrorContainer>
)

export const ErrorScreenSize = () => (
  <ErrorContainer>
    <ErrorWrap>
      <p>Please increase browser size.</p>
    </ErrorWrap>
  </ErrorContainer>
)
