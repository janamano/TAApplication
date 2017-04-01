import React, { Component } from 'react';
import Courses from './Courses';

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
                
            </Router>
            // <div>
            //     <Nav heading="TA Coordinator System"/>
            //     <Courses />
            // </div>
        );
    }
}