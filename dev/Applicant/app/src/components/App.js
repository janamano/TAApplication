import React, { Component } from 'react';
import Login from './Login';
import Nav from './Nav';
import Profile from './Profile';

export default class App extends Component {
    constructor() {
        super();
    }
 
    render() {
        /*
        return (
            <div>
                <Nav />
                <Login />
            </div>
        );
        */
        return (
            <div>
                <Profile />
            </div>
        )
    }
}