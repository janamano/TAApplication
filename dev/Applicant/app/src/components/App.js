import React, { Component } from 'react';
import Login from './Login';
import Nav from './Nav';
import Profile from './Profile';
import CourseSelection from './CourseSelection';
import {
    Router,
    Route,
    Link,
    IndexRoute,
    hashHistory,
    browserHistory
} from 'react-router';

export default class App extends Component {
    constructor() {
        super();
    }
 
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Login}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/courseselection' component={CourseSelection} />
            </Router>
        );
    }
}