import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';

export default class Login extends Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <form>
            <Row>
                <Input class='validate' pattern='[a-zA-Z0-9].{5,}' label="UtorID" s={6} required/>
                <Input class='validate' pattern='[0-9].{10}' label="Student Number" s={6} required/>
                
                <Button waves='light' type="submit">Login</Button>
            </Row>
            </form>
        );

    }
}