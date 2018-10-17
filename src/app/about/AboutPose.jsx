import posed from 'react-pose'
import AppConfig from '../App.config'
import Ease from '../common/Ease'

export const InfoArticle = posed.article({
  enter: { staggerChildren: AppConfig.pageTransitionTime / 30 }
})

export const InfoLine = posed.div({
  mount: {
    transform: `translate3d(0px, 100%, 0px)`
  },
  enter: {
    transform  : `translate3d(0px, 0%, 0px)`,
    transition : {
      duration : AppConfig.pageTransitionTime,
      ease     : Ease['o5']
    }
  },
  exit: {
    transform  : `translate3d(0px, -100%, 0px)`,
    transition : {
      duration : AppConfig.pageTransitionTime,
      ease     : Ease['o5']
    }
  }
})

export const InfoStreamMask = posed.div({
  mount: {
    transform: `translate3d(-100%, 0%, 0px)`
  },
  enter: {
    transform  : `translate3d(0%, 0%, 0px)`,
    transition : {
      duration : AppConfig.pageTransitionTime,
      ease     : Ease['i04']
    }
  },
  exit: {
    transform  : `translate3d(100%, 0%, 0px)`,
    transition : {
      duration : AppConfig.pageTransitionTime,
      ease     : Ease['05']
    }
  }
})

export const InfoStreamInner = posed.div({
  mount: {
    transform: `translate3d(100%, 0%, 0px)`
  },
  enter: {
    transform  : `translate3d(0%, 0%, 0px)`,
    transition : {
      duration : AppConfig.pageTransitionTime,
      ease     : Ease['i04']
    }
  },
  exit: {
    transform  : `translate3d(-100%, 0%, 0px)`,
    transition : {
      duration : AppConfig.pageTransitionTime,
      ease     : Ease['05']
    }
  }
})
