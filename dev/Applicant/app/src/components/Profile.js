import React, { Component } from "react";
import { Row, Input, Icon, Button } from "react-materialize";
import Nav from './Nav';

export default class Profile extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Nav heading={"Student Profile"} />
                <form id="profileForm">
                    <Row>
                        <Input s={6} label="First Name" required />
                        <Input s={6} label="Last Name" required />
                        <Input s={12} label="Student Number" pattern="[0-9]{10}" title="Must be 9 or 10 numeric values" required />
                        <Input s={12} label="Telephone" type="tel" pattern="[\d]{10}" title="Must be 10 numeric values" required />
                        <Input s={12} label="Email" type="email" required />
                        <Input s={12} type="select" label="Degree Status" defaultValue="Undergrad">
                            <option value="Undergrad">Undergraduate</option>
                            <option value="Masters">Master's</option>
                            <option value="PhD">PhD</option>
                        </Input>
                        <Input s={12} type="select" label="Year of Study" defaultValue="1">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Input>
                        <Input s={12} label="Program of Study" required />
                        <Input s={12} type="select" label="Work Eligibility" defaultValue="Legally Entitled">
                            <option value="Legally Entitled">Legally Entitled</option>
                            <option value="Student Visa">Student Visa</option>
                        </Input>
                        <Input s={12} type="select" label="Status" defaultValue="Full-Time">
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