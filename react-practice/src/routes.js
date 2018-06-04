import React from 'react'
import { Router } from 'react-router'
import PropTypes from 'prop-types'
import App from './views/App'

const getRoutes = store => ({
  path: '/',
  component: App,
})

const Routes = ({ history, store }) => (
  <Router history={history} routes={getRoutes(store)} />
)

Routes.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}

export default Routes
