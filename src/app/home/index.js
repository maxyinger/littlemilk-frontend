import React from 'react'
import Loadable from 'react-loadable'

const loading = () => <div>Loading...</div>

const Home = Loadable({
  loader: () => import('./HomeContainer'),
  loading
})

export default Home
