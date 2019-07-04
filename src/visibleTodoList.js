import { connect } from 'react-redux';
import { toggleTodo } from './actioncreators.js';
import { withRouter } from 'react-router';
import { TodoList } from './todoList.js';
import { getVisibleTodos } from './components.js';

const mapStateToTodoListProps = (state, { params }) => ({
  todos: getVisibleTodos(
    state,
    params.filter || 'all'
  )
});

/*  const mapDispatchToTodoListProps = (dispatch) => ({
   onTodoClick(id) {
     dispatch(toggleTodo(id))
   }
 }); */


export const VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  { onTodoClick: toggleTodo }
)(TodoList));

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