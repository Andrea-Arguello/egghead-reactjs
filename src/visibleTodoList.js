import React, { Component } from 'react';
import { connect } from 'react-redux';
import *as actions from './actioncreators.js';
import { withRouter } from 'react-router';
import { TodoList } from './todoList.js';
import { getVisibleTodos, getErrorMessage, getIsFetching } from './todos';
import FetchError from './fetchError';

class VisibleTodoList extends Component {

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { toggleTodo, errorMessage, todos, isFetching } = this.props
    if (isFetching && !todos.length) {
      return <p>Loading...</p>
    }
    if (errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()} />
      )
    }
    return <TodoList todos={todos} onTodoClick={toggleTodo} />;
  }

  componentDidUpdate(previousProps) {
    if (this.props.filter !== previousProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter).then(() => console.log('done!'));
  }

}



const mapStateToTodoListProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state,filter),
    isFetching: getIsFetching(state, filter),
    filter
  }
};

/*  const mapDispatchToTodoListProps = (dispatch) => ({
   onTodoClick(id) {
     dispatch(toggleTodo(id))
   }
 }); */


VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;

/* const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter(
        t => t.completed
      );
    case 'active':
      return todos.filter(
        t => !t.completed
      );
    default:
      throw new Error(`Unknown filter: ${filter}.`)

  }
} */