import { v4 } from 'node-uuid';

//pretends to call a server


export const addTodo = (text) =>
    delay(500).then(() => {
        const todo = {
            id: v4(),
            text,
            completed: false
        };
        fakeDB.todos.push(todo);
        return todo;
    });

export const toggleTodo = (id) =>
    delay(500).then(() => {
        const todo = fakeDB.todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        return todo
    });

const fakeDB = {
    todos: [{
        id: v4(),
        text: 'hola',
        completed: true,
    }, {
        id: v4(),
        text: 'adios',
        completed: false,
    }]
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
    delay(500).then(() => {
        if (Math.random() > 0.8) {
            throw new Error('404');
        }
        switch (filter) {
            case 'all':
                return fakeDB.todos;
            case 'completed':
                return fakeDB.todos.filter(t => t.completed);
            case 'active':
                return fakeDB.todos.filter(t => !t.completed);
            default:
                throw new Error(`Unknown filter: ${filter}`)
        }
    });