import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleTodo, fetchTodos } from './actioncreators.js';
import { withRouter } from 'react-router';
import { TodoList } from './todoList.js';
import { getVisibleTodos } from './components.js';

class VisibleTodoList extends Component {

  componentDidMount(){
    this.fetchData();
  }

  render() {
    return <TodoList {...this.props}/>;
  }

  componentDidUpdate(previousProps) {
    if (this.props.filter !== previousProps.filter) {
      this.fetchData();
    }
  }

  fetchData(){
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

}



const mapStateToTodoListProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state,filter), 
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
  { onTodoClick: toggleTodo, fetchTodos }
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