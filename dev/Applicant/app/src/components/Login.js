import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';

export default class Login extends Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <Row>
                <Input label="User Name" s={6} />
                <Input label="Password" s={6} type="password" />
                <Input label="Email" s={12} type="email"/>
                <Button waves='light' type="submit">Login</Button>
            </Row>
        );

    }
}