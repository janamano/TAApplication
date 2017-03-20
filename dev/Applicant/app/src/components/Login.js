import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { hashHistory } from 'react-router';
import 'whatwg-fetch';

import Nav from './Nav';

let utils = require('../utils.js');
let json = utils.json;

export default class Login extends Component {
    constructor() {
        super();
    }
    
    handleClick(e) {
        e.preventDefault();

        var utoridregex = /^([A-Za-z0-9]{4,})$/;
        var stunumregex = /^([0-9]{9,10})$/;

        // values entered in the UTOR/StuNum fields
        let utor = document.getElementById("utorid").value;
        let stunum = document.getElementById("studentnum").value;

        let isUtorValid = utoridregex.test(utor);
        let isStuNumValid = stunumregex.test(stunum);
        if (!isUtorValid) {
            Materialize.toast('Enter a valid UtorID', 2000);
        } 
        if (!isStuNumValid) {
            Materialize.toast('Enter a valid Student Number', 2000);
        }

        // if both are valid
        if (isUtorValid && isStuNumValid) {
            fetch('/login?studentNum=' + stunum + '&' + 'utorid=' + utor, { method: 'GET' })
                .then(json)
                .then(function(data) {
                    if (data.status === "success") {
                        const student = data.data[0];
                        hashHistory.push({
                            pathname: `/profile`,
                            state: { data: student }
                        })
                    } else {
                        Materialize.toast('Your UTORid and Student Number do not match', 2000);
                    }
                })
                .catch(function(err) {
                    throw err;
                });
        }
    }

    render() {
        var style = {
            //textAlign: 'center',
            width: '70%',
            margin: 'auto'
        };
        var style2 = {
            fontSize: '1.22em'
        }
        return (
            <div>
                <Nav heading="TA Application System"/>
                <form style={style} className='center'>
                    <Row>
                        <Input style={style2} id="utorid" className='validate center' pattern='[a-zA-Z0-9].{4,}' label="UtorID" s={12} required/>
                        <Input style={style2} id="studentnum" className='validate center' pattern='[0-9].{9,10}' label="Student Number" s={12} required/>
                        <Button waves='light' onClick={this.handleClick} type="submit">Login</Button>
                    </Row>
                </form>
            </div>
        );

    }
}