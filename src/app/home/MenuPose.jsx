import posed from 'react-pose'
import appConfig from '../App.config'
import Ease from '../common/Ease'

export const MenuController = posed.div({
  active: { staggerChildren: appConfig.dragTransitionTime / 50 }
})

export const MenuItemInner = posed.div({
  active: {
    transform  : 'translate3d(0, 0%, 0)',
    transition : {
      duration : appConfig.dragTransitionTime,
      ease     : Ease['o4']
    }
  },
  inActive: {
    transform  : 'translate3d(0, 150%, 0)',
    transition : {
      duration : (appConfig.dragTransitionTime * 2) / 3,
      ease     : Ease['o4']
    }
  }
})
