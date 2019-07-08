import { v4 } from 'node-uuid';

//pretends to call a server

const fakeDB={
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

const delay = (ms) => new Promise(resolve => setTimeout(resolve,ms));

export const fetchTodos = (filter) =>
    delay(500).then(() => {
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