import Loadable from 'react-loadable'
import LoadingDefault from '../common/LoadingDefault'

const Home = Loadable({
  loader  : () => import(/* webpackChunkName: "Home" */ './HomeContainer'),
  loading : LoadingDefault
})

export default Home
