import posed from 'react-pose'
import appConfig from '../App.config'
import { Power4 } from 'gsap/EasePack'

// const Power4 = easing.cubicBezier(0, 0.42, 0, 1)

export const Section = posed.div({
  active: {
    // opacity: 1
  },
  inActive: {
    // opacity: 0
  }
})

export const Data = posed.div({
  active: { staggerChildren: appConfig.dragTransitionTime / 18 }
})

export const DataLine = posed.div({
  active: {
    transform  : 'translate3d(0, 0%, 0)',
    transition : {
      duration : appConfig.dragTransitionTime,
      ease     : m => 1 + --m * m * m * m * m
    }
  },
  inActive: {
    transform  : 'translate3d(0, 200%, 0)',
    transition : {
      duration : appConfig.dragTransitionTime,
      ease     : m => 1 + --m * m * m * m * m
    }
  }
})
