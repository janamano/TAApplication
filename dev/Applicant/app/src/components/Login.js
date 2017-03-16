import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';

export default class Login extends Component {
    constructor() {
        super();
    }
    
    handleClick(e) {
        e.preventDefault();

        var utoridregex = /^([A-Za-z0-9]{5,})$/;
        var stunumregex = /^([0-9]{6,})$/;

        if (! utoridregex.test(document.getElementById("utorid").value)) {
            Materialize.toast('Enter a valid UtorID', 2000);
        }
         
        if (! stunumregex.test(document.getElementById("studentnum").value)) {
          Materialize.toast('Enter a valid Student Number', 2000);
        }

    }

    render() {
        return (
            <form>
            <Row>
                <Input id="utorid" className='validate' pattern='[a-zA-Z0-9].{5,}' label="UtorID" s={6} required/>
                <Input id="studentnum" className='validate' pattern='[0-9].{10}' label="Student Number" s={6} required/>
                
                <Button waves='light' onClick={this.handleClick} type="submit">Login</Button>
            </Row>
            </form>
        );

    }
}