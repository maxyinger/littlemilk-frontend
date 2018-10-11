import posed from 'react-pose'
import appConfig from '../App.config'
import styled from 'styled-components'
import Ease from '../common/Ease'
export const Section = posed.div()

export const Data = posed.div({
  active: {
    staggerChildren  : appConfig.dragTransitionTime / 100,
    staggerDirection : 1
  }
})

export const DataLine = posed.div({
  active: {
    transform  : 'translate3d(0, 0%, 0)',
    transition : {
      duration : appConfig.dragTransitionTime,
      ease     : Ease['o4']
    }
  },
  inActive: {
    transform  : 'translate3d(0, 200%, 0)',
    transition : {
      duration : appConfig.dragTransitionTime,
      ease     : Ease['o4']
    }
  }
})

export const TitleChar = styled(
  posed.div({
    active: {
      transform  : 'translate3d(0%, 0, 0)',
      transition : {
        duration : (appConfig.dragTransitionTime * 5) / 6,
        ease     : Ease['o3']
      }
    },
    inActive: {
      transform  : 'translate3d(-150%, 0, 0)',
      transition : {
        duration : (appConfig.dragTransitionTime * 2) / 3,
        ease     : Ease['o3']
      }
    }
  })
)`
  display: inline-block;
`

export const TitleCharWrap = styled.div`
  display: inline-block;
  padding: 50px 0;
  transform: translate3d(0, 50px, 0);
`
export const TitleChars = posed.div({
  active: {
    staggerChildren  : appConfig.dragTransitionTime / 50,
    staggerDirection : 1
  }
})
