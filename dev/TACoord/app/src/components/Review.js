import React, { Component } from 'react';
import { Row, Button, Collapsible, CollapsibleItem, Modal, Collection } from "react-materialize";
import Applicant from './Applicant';
import Filter from './Filter';

let utils = require('../utils.js');
let json = utils.json;


export default class Review extends Component {
    constructor(props) {
        super(props);

        const courseCarts = props.location.state.data;

        this.state = {
            courseCarts: courseCarts
        };
    }

    render() {
            var style = {
            textAlign: 'center',
            width: '70%',
            //marginLeft: '2%',
            //marginBottom: '2%'
            
            margin: 'auto'
        }

        var headingStyle = {
            //textAlign: 'center',
            marginLeft: '15%'
        }
        var style2 = {
            textAlign: 'left'
        }
        return (
            <div>
                <h3 style={headingStyle} className='thin'> Considered Applicants</h3>
                {this.state.courseCarts.map(cart =>
                    <div style={style} key={cart.code}>
                        <h4 style={style2} className='thin'>{cart.code}</h4>
                        {cart.applicants.map(applicant =>
                        <p style={style2} key={applicant.UTORid}>{applicant.UTORid}</p>
                        )}
                    </div>)}
            </div>
        )
}
}