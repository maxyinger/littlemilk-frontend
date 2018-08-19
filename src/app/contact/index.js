import React from 'react'
import Loadable from 'react-loadable'

const loading = () => <div>Loading...</div>

const Contact = Loadable({
  loader: () => import('./ContactContainer'),
  loading
})

export default Contact
