import React, { Component } from 'react';
import Login from './Login';
import Nav from './Nav';
import CourseSelection from './CourseSelection';

export default class App extends Component {
    constructor() {
        super();
    }
 
    render() {
        return (
            <div>
                <Nav heading="TA Application System"/>
                <Login />
                <CourseSelection />
            </div>
        );
    }
}