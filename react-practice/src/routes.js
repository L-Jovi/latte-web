import React from 'react'
import { Router } from 'react-router'
import PropTypes from 'prop-types'
import Wrapper from './views/Wrapper'
import TodoApp from './views/App'
import RichDiv from './views/RichDiv'

const getRoutes = store => ({
  path: '/',
  component: Wrapper,
  indexRoute: {
    onEnter: (nextState, replace, cb) => {
      if (nextState.location.pathname === '/') {
        replace('/todo')
      }
      cb()
    },
  },
  childRoutes: [
    {
      path: '/todo',
      component: TodoApp,
    },
    {
      path: '/rich-div',
      component: RichDiv,
    },
  ],
})

const Routes = ({ history, store }) => (
  <Router history={history} routes={getRoutes(store)} />
)

Routes.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}

export default Routes
