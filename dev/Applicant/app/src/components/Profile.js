import React, { Component } from "react";
import { Row, Input, Icon, Button } from "react-materialize";
import { hashHistory } from 'react-router';
import 'whatwg-fetch';

import Nav from './Nav';

export default class Profile extends Component {
    constructor(props) {
        super(props);

        const student = props.location.state.data;

        this.state = {
            UTORid: student.UTORid,
            studentNumber: student.studentNumber,
        }

        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const t = this;
        const student = this.props.location.state.data;
        if (student.hasOwnProperty('lastName')) {
            t.setState({
                lastName: student.lastName,
                firstName: student.firstName,
                phoneNumber: student.phoneNumber,
                email: student.email,
                positionAssigment: student.positionAssigment,
                studentInformation: student.studentInformation,
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        /*
        TODO: once the backend API to save info is done, then build the actual
              fetch() request.
        */
        
        // Until then...
        hashHistory.push({
            pathname: `/history`,
            state: { 
                studentNumber: this.state.studentNumber,
                TAHistory: (typeof this.state.studentInformation != 'undefined' && 
                                typeof this.state.studentInformation.TAHistory != 'undefined') 
                                ? 
                            this.state.studentInformation.TAHistory : []
            }
        })
    }

    render() {
        return (
            <div>
                <Nav heading={"Student Profile"} />
                <form id="profileForm" onSubmit={this.handleSubmit}>
                    <Row>
                        <Input s={6} 
                            label="First Name" 
                            required 
                            defaultValue={(typeof this.state.firstName != 'undefined') ? this.state.firstName : ""}
                        />
                        <Input s={6} 
                            label="Last Name" 
                            required 
                            defaultValue={(typeof this.state.lastName != 'undefined') ? this.state.lastName : ""}
                        />
                        <Input s={12} 
                            label="Student Number" 
                            pattern="[0-9]{9,10}" 
                            title="Must be 9 or 10 numeric values" 
                            disabled
                            defaultValue={this.state.studentNumber}
                        />
                        <Input s={12} 
                            label="Telephone" 
                            type="tel" 
                            pattern="([\+]?[\d]{1,3})?[\d]{10}" 
                            title="Please enter a valid, 10-digit phone number (with optional '+' and country code)" 
                            required 
                            defaultValue={(typeof this.state.phoneNumber != 'undefined') ? this.state.phoneNumber : ""}
                        />
                        <Input s={12} 
                            label="Email" 
                            type="email" 
                            required 
                            defaultValue={(typeof this.state.email != 'undefined') ? this.state.email : ""}
                        />
                        <Input s={12} type="select" label="Degree Status" 
                            defaultValue=
                                {(typeof this.state.studentInformation != 'undefined') ? 
                                    this.state.studentInformation.programLevel : "Undergrad"}
                        >
                            <option value="Undergrad">Undergraduate</option>
                            <option value="Masters">Master's</option>
                            <option value="PhD">PhD</option>
                        </Input>
                        <Input s={12} type="select" label="Year of Study" 
                            defaultValue=
                                {(typeof this.state.studentInformation != 'undefined') ? 
                                    this.state.studentInformation.year : "1"}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Input>
                        <Input s={12} 
                            label="Program of Study" 
                            required 
                            defaultValue=
                                {(typeof this.state.studentInformation != 'undefined') ? 
                                    this.state.studentInformation.programName : ""}
                        />
                        <Input s={12} type="select" label="Work Eligibility" 
                            defaultValue=
                                {(typeof this.state.studentInformation != 'undefined') ? 
                                    this.state.studentInformation.workStatus : "Legally Entitled"}
                        >
                            <option value="Legally Entitled">Legally Entitled</option>
                            <option value="Student Visa">Student Visa</option>
                        </Input>
                        <Input s={12} type="select" label="Status" 
                            defaultValue=
                                {(typeof this.state.studentInformation != 'undefined') ? 
                                    this.state.studentInformation.studentStatus : "Full-Time"}
                        >
                            <option value="Full-Time">Enrolled Full-Time</option>
                            <option value="Part-Time">Enrolled Part-Time</option>
                            <option value="Not Enrolled">Not Enrolled</option>
                        </Input>
                        <Button waves='light' type="submit">Enter</Button>
                    </Row>
                </form>
            </div>
        );
    }
}