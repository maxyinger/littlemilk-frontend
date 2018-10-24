import posed from 'react-pose'
import AppConfig from '../App.config'
import Ease from '../common/Ease'

export const InfoArticle = posed.article({
  enter: { staggerChildren: AppConfig.pageTransitionTime / 50 }
})

export const InfoLine = posed.div({
  mount: {
    transform: `translate3d(0px, 130%, 0px)`
  },
  enter: {
    transform  : `translate3d(0px, 0%, 0px)`,
    transition : {
      duration : AppConfig.pageTransitionTime,
      ease     : Ease['io4']
    }
  },
  exit: {
    transform  : `translate3d(0px, -130%, 0px)`,
    transition : {
      duration : AppConfig.pageTransitionTime,
      ease     : Ease['io3']
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
      duration : AppConfig.pageTransitionTime * 1.1,
      ease     : Ease['io4']
    }
  },
  exit: {
    transform  : `translate3d(100%, 0%, 0px)`,
    transition : {
      duration : AppConfig.pageTransitionTime * 1.4,
      ease     : Ease['io3']
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
      duration : AppConfig.pageTransitionTime * 1.1,
      ease     : Ease['io4']
    }
  },
  exit: {
    transform  : `translate3d(-100%, 0%, 0px)`,
    transition : {
      duration : AppConfig.pageTransitionTime * 1.4,
      ease     : Ease['io3']
    }
  }
})
