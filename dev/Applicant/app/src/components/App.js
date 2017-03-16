import React, { Component } from 'react';
import Login from './Login';
import Nav from './Nav';
import CourseInfo from './CourseInfo';

export default class App extends Component {
    constructor() {
        super();
    }
 
    render() {
        return (
            <div>
                <Nav heading="TA Application System"/>
                <Login />
                <CourseInfo code="CSC108" />
            </div>
        );
    }
}