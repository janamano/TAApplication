import React, { Component } from 'react';
import Nav from './Nav';
import Courses from './Courses'

export default class Main extends Component {
    constructor() {
        super();
    }
 
    render() {
        return (
            <div>
                <Nav heading="TA Coordinator System"/>
                <Courses />
            </div>
        );
    }
}