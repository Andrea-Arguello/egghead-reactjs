import React from 'react';
import { Footer } from './footer.js';
import { connect } from 'react-redux';
import { addTodo } from './actioncreators.js';
import VisibleTodoList from './visibleTodoList.js';


let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node;
      }
      } />
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}>Add Todo</button>
    </div>
  );
};
AddTodo = connect()(AddTodo);


export const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);
