import React, { Component } from 'react';
import Main from './Main';

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
                <Route path='/' component={Main}/>
                <Route path='/review' component={Review}/>
            </Router>
            // <div>
            //     <Nav heading="TA Coordinator System"/>
            //     <Courses />
            // </div>
        );
    }
}