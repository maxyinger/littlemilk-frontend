import Loadable from 'react-loadable'
import LoadingDefault from '../common/LoadingDefault'

const About = Loadable({
  loader  : () => import(/* webpackChunkName: "About" */ './AboutContainer'),
  loading : LoadingDefault
})

export default About
