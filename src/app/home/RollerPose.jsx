import posed from 'react-pose'
import Ease from '../common/Ease'
import AppConfig from '../App.config'

export const RollerTransition = posed.div({
  mount: {
    transform: `translate3d(0%, 110%, 0)`
  },
  enter: {
    transform  : `translate3d(0%, 0%, 0)`,
    transition : {
      duration : AppConfig.pageTransitionTime,
      ease     : Ease['io3']
    }
  },
  exit: {
    transform  : 'translate3d(0%, -200%, 0)',
    transition : {
      duration : AppConfig.pageTransitionTime,
      ease     : Ease['io4']
    }
  }
})
