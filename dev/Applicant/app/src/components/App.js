import React, { Component } from 'react';
import Login from './Login';
import Nav from './Nav';

class App extends Component {
    constructor() {
        super();
    }
 
    render() {
        return (
            <div>
                <Nav />
                <Login />
            </div>
        );
    }
}


export default App;