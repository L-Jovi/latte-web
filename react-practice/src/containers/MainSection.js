import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as TodoActions from '../actions'
import MainSection from '../components/MainSection'
import { getCompletedTodoCount } from '../selectors'


const mapStateToProps = state => {
  console.log(state)
  return {
    todosCount: state.todos.length,
    completedCount: getCompletedTodoCount(state),
  };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection)
