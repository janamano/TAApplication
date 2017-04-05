import React, { Component } from "react";
import { Row, Input, Icon, Button } from "react-materialize";
import { hashHistory } from 'react-router';
import 'whatwg-fetch';

import Nav from './Nav';

let utils = require('../utils.js');
let json = utils.json;

export default class Profile extends Component {
    constructor(props) {
        super(props);

        const student = props.location.state.data;
        const submitted = props.location.state.submitted;

        this.state = {
            UTORid: student.UTORid,
            studentNumber: student.studentNumber,
            firstName: undefined,
            lastName: undefined,
            phoneNumber: undefined,
            email: undefined,
            degree: "Undergrad",
            year: "1",
            program: "",
            eligibility: "Legally Entitled",
            status: "Full-Time",
            initialStudentInformation: undefined,   // info of the student upon page-load
            submitted: submitted
        }

        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleFNameChange = this.handleFNameChange.bind(this);
        this.handleLNameChange = this.handleLNameChange.bind(this);
        this.handleNumChange = this.handleNumChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleDegreeChange = this.handleDegreeChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleProgramChange = this.handleProgramChange.bind(this);
        this.handleEligibilityChange = this.handleEligibilityChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
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
                degree: student.studentInformation.programLevel,
                year: student.studentInformation.year,
                program: student.studentInformation.programName,
                eligibility: student.studentInformation.workStatus,
                status: student.studentInformation.studentStatus,
                initialStudentInformation: student.studentInformation,
            });
        }
    }

    handleFNameChange(event) {
        this.setState({
            firstName: event.target.value
        });
    }

    handleLNameChange(event) {
        this.setState({
            lastName: event.target.value
        });
    }

    handleNumChange(event) {
        this.setState({
            phoneNumber: event.target.value
        });
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    handleDegreeChange(event) {
        this.setState({
            degree: event.target.value
        });
    }

    handleYearChange(event) {
        this.setState({
            year: event.target.value
        });
    }

    handleProgramChange(event) {
        this.setState({
            program: event.target.value
        });
    }

    handleEligibilityChange(event) {
        this.setState({
            eligibility: event.target.value
        });
    }

    handleStatusChange(event) {
        this.setState({
            status: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        var t = this;

        // if the application hasn't already been submitted, save the info and continue
        if (!t.state.submitted) {
            fetch('/save-profile', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentNumber: t.state.studentNumber,
                    UTORid: t.state.UTORid,
                    lastName: this.refs.firstName.props.defaultValue,
                    firstName: this.refs.lastName.props.defaultValue,
                    phoneNumber: this.refs.phoneNumber.props.defaultValue,
                    email: this.refs.email.props.defaultValue,
                    studentInformation: {
                        programLevel: this.refs.degree.props.defaultValue,
                        year: this.refs.year.props.defaultValue,
                        programName: this.refs.program.props.defaultValue,
                        workStatus: this.refs.eligibility.props.defaultValue,
                        studentStatus: this.refs.status.props.defaultValue,
                    }
                })
            })
            .then(json)
            .then(function(data) {
                hashHistory.push({
                    pathname: `/history`,
                    state: { 
                        UTORid: t.state.UTORid,
                        studentNumber: t.state.studentNumber,
                        TAHistory: (typeof t.state.initialStudentInformation != 'undefined' && 
                                typeof t.state.initialStudentInformation.TAHistory != 'undefined') 
                                ? 
                            t.state.initialStudentInformation.TAHistory : [],
                        submitted: t.state.submitted
                    }
                });
            })
            .catch(function(err) {
                throw err;
            });
        } else {
            // if application *has* been submitted, just go to next page
            hashHistory.push({
                pathname: `/history`,
                state: { 
                    UTORid: t.state.UTORid,
                    studentNumber: t.state.studentNumber,
                    TAHistory: (typeof t.state.initialStudentInformation != 'undefined' && 
                            typeof t.state.initialStudentInformation.TAHistory != 'undefined') 
                            ? 
                        t.state.initialStudentInformation.TAHistory : [],
                    submitted: t.state.submitted
                }
            });
        }
    }

    render() {
        var style = {
            textAlign: 'center',
            width: '60%',
            margin: 'auto',
        };
        return (
            <div>
                <Nav 
                    heading={"Student Profile"} 
                    stunum={this.props.location.state.data.studentNumber} 
                    UTORid={this.state.UTORid}
                    activePage={"Profile"}
                />
                {this.state.submitted ? 
                 <div>
                     <p className="thin center">
                         <b>You have already submitted your application, and thus can
                         no longer update your details.</b>
                    </p>
                    <p />
                 </div>
                 : 
                 null}
                <form style={style} id="profileForm" onSubmit={this.handleSubmit}>
                    <Row>
                        <Input s={6} 
                            disabled={this.state.submitted}
                            label="First Name"
                            ref="firstName"
                            required 
                            defaultValue={(typeof this.state.firstName != 'undefined') ? this.state.firstName : ""}
                            onChange={this.handleFNameChange}
                        />
                        <Input s={6} 
                            disabled={this.state.submitted}
                            label="Last Name" 
                            ref="lastName"
                            required 
                            defaultValue={(typeof this.state.lastName != 'undefined') ? this.state.lastName : ""}
                            onChange={this.handleLNameChange}
                        />
                        <Input s={12} 
                            label="Student Number" 
                            ref="stunum"
                            pattern="[0-9]{9,10}" 
                            title="Must be 9 or 10 numeric values" 
                            disabled
                            defaultValue={this.state.studentNumber}
                        />
                        <Input s={12} 
                            disabled={this.state.submitted}
                            label="Telephone" 
                            ref="phoneNumber"
                            type="tel" 
                            pattern="([\+]?[\d]{1,3})?[\d]{10}" 
                            title="Please enter a valid, 10-digit phone number (with optional '+' and country code)" 
                            required 
                            defaultValue={(typeof this.state.phoneNumber != 'undefined') ? this.state.phoneNumber : ""}
                            onChange={this.handleNumChange}
                        />
                        <Input s={12} 
                            disabled={this.state.submitted}
                            label="Email" 
                            ref="email"
                            type="email" 
                            required 
                            defaultValue={(typeof this.state.email != 'undefined') ? this.state.email : ""}
                            onChange={this.handleEmailChange}
                        />
                        <Input s={12} type="select" label="Degree Status" ref="degree"
                            disabled={this.state.submitted}
                            defaultValue=
                                {(typeof this.state.initialStudentInformation != 'undefined') ? 
                                    this.state.degree : "Undergrad"}
                            onChange={this.handleDegreeChange}
                        >
                            <option value="Undergrad">Undergraduate</option>
                            <option value="Masters">Master's</option>
                            <option value="PhD">PhD</option>
                        </Input>
                        <Input s={12} type="select" label="Year of Study" ref="year"
                            disabled={this.state.submitted}
                            defaultValue=
                                {(typeof this.state.initialStudentInformation != 'undefined') ? 
                                    this.state.year : "1"}
                            onChange={this.handleYearChange}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Input>
                        <Input s={12}
                            disabled={this.state.submitted} 
                            label="Program of Study" 
                            ref="program"
                            required 
                            defaultValue=
                                {(typeof this.state.initialStudentInformation != 'undefined') ? 
                                    this.state.program : ""}
                            onChange={this.handleProgramChange}
                        />
                        <Input s={12} type="select" label="Work Eligibility" ref="eligibility"
                            disabled={this.state.submitted}
                            defaultValue=
                                {(typeof this.state.initialStudentInformation != 'undefined') ? 
                                    this.state.eligibility : "Legally Entitled"}
                            onChange={this.handleEligibilityChange}
                        >
                            <option value="Legally Entitled">Legally Entitled</option>
                            <option value="Student Visa">Student Visa</option>
                        </Input>
                        <Input s={12} type="select" label="Status" ref="status"
                            disabled={this.state.submitted}
                            defaultValue=
                                {(typeof this.state.initialStudentInformation != 'undefined') ? 
                                    this.state.status : "Full-Time"}
                            onChange={this.handleStatusChange}
                        >
                            <option value="Full-Time">Enrolled Full-Time</option>
                            <option value="Part-Time">Enrolled Part-Time</option>
                            <option value="Not Enrolled">Not Enrolled</option>
                        </Input>
                        <Button waves='light' type="submit">
                            {this.state.submitted ? "Next" : "Save and Next"}
                        </Button>
                    </Row>
                </form>
            </div>
        );
    }
}