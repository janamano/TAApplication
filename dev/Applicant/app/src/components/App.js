import React, { Component } from 'react';
import {
    Router,
    Route,
    Link,
    IndexRoute,
    hashHistory,
    browserHistory
} from 'react-router';

import Login from './Login';
import Nav from './Nav';
import Profile from './Profile';
import CourseSelection from './CourseSelection';
import ApplicantHistory from './ApplicantHistory';

export default class App extends Component {
    constructor() {
        super();
    }
 
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Login}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/history' component={ApplicantHistory} />
                <Route path='/courseselection' component={CourseSelection} />
            </Router>
        );
    }
}