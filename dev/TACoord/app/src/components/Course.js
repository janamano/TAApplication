import React, { Component } from 'react';
import { Row, Button, Collapsible, CollapsibleItem, Modal } from "react-materialize";
import Applicant from './Applicant';

let applicantsCart = [];

export default class Course extends Component {
    constructor() {
        super();

        this.state = {
            applicants: [],
            applicantsCart: []
        };


        this.componentWillMount = this.componentWillMount.bind(this);
    }
    
    componentWillMount() {
        var t = this;
        // get all the applicants who applied to this course
        var query = '/getApplicants?course=' + this.props.code;
        // fetch(query, {method: 'GET'})
        //     .then(json)
        //     .then(function(data) {
        //         // store this in the state courses to create course objects
        //         const applicants = data.data;
        //         t.setState({
        //             applicants: applicants.map(function(applicant) {
        //                 return {UTORid: applicant.UTORid,
        //                         studentNumber: applicant.studentNumber,
        //                         lastName: applicant.lastName,
        //                         firstName: applicant.firstName,
        //                         phoneNumber: applicant.phoneNumber,
        //                         email: applicant.email,
        //                         studentInformation: applicant.studentInformation}
        //             })
        //         });
        //     })
        //     .catch(function(err) {
        //     // fetch didnt work
        //     throw err;
        // });
        // make the fetch call to get all the applicants that applied to this courseCode
        t.setState({
            applicants: [{ studentNumber: 12345,   UTORid: "manoha56", lastName: "Manoharan", firstName: "Janarthanan", phoneNumber: "4161231234", email: "jana@gmail.com",
            studentInformation: {programLevel: "Undergraduate", year: 3, programName: "Computer Science", workStatus: "Legally Entitled", studentStatus: 'True', 
            TAHistory: [{courseCode: "CSCA08", timesTAd: 1}, {courseCode: "CSCA48", timesTAd: 2}]} },
                        {studentNumber: 12215,   UTORid: "atheed12", lastName: "Thameem", firstName: "Atheed", phoneNumber: "4163231234", email: "Atheed@gmail.com",
                        studentInformation: {programLevel: "Undergraduate", year: 4, programName: "Computer Science", workStatus: "Legally Entitled", studentStatus: 'True', 
                        TAHistory: [{courseCode: "CSCA08", timesTAd: 1},{courseCode: "CSCA48", timesTAd: 2}]} }]
        });
    }
    
    toggleCart(student) {
        var cart = this.state.applicantsCart;
        var index = cart.indexOf(student);

        // add the student to the course's cart if accepted, otherwise remove from cart
        this.props.onChange(this.props.code, student);
        // if (index > -1) {
        //     // if the student is in the cart, remove them
        //     cart.splice(index, 1);
        // } else {
        //     // otherwise add the student to cart
        //     cart.push(student);
        // }


        this.setState({
                 applicantsCart: cart
        });
    }

    render() {
        let head = this.props.code + ": " + this.props.title;
        return (

        <CollapsibleItem header={ head }>
                <p>Course Code: {this.props.code}
                   Title: {this.props.title}
                   Number of TAs: {this.props.numberOfTAs}
                   Qualifications: {this.props.qualifications}
                   </p>
                <Collapsible>
                    <CollapsibleItem header="View Applicants">
                        {this.state.applicants.map(applicant =>
                            // TODO pass in a single prop for the applicant info
                            <Applicant key={applicant.studentNumber}
                                       applicantInfo={applicant}
                                       courseUnderConsideration={this.props.code}
                                       toggleFunction={this.toggleCart.bind(this)}
                                       // TODO: disable accept when numTAs reached
                                       numTAs={this.props.numberOfTAs} />
                        )}
                    </CollapsibleItem>
                </Collapsible>
                
                
        </CollapsibleItem>
        )
    }
}