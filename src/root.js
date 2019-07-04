import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
//import {BrowserRouter,Route} from 'react-router-dom';
import { TodoApp } from './App.js';

const Root = ({ store }) => (
    <Provider store={store}>
    <Router history={browserHistory}>
        <Route path='/(:filter)' component={TodoApp}/>
    </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;