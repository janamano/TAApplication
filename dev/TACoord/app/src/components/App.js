import React, { Component } from 'react';
import Courses from './Courses';
import Review from './Review'

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
                <Route path='/' component={Courses}/>
                <Route path='/review' component={Review}/>                
            </Router>
        );
    }
}