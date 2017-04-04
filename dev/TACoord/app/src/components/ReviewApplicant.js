import React, { Component } from 'react';
import { Row, Button, Collapsible, CollapsibleItem, Modal, CollectionItem } from "react-materialize";

let utils = require('../utils.js');
let json = utils.json;

export default class ReviewApplicant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            studentNumber: this.props.studentNumber,
            applicantName: '',
            UTORid: '',
            phoneNumber: '',
            email: '',
            programName: '',
            programLevel: '',
            year: '',
            workStatus: '',
            studentStatus: '',
            TAHistory: ''
        };

      this.componentWillMount = this.componentWillMount.bind(this);
      this.removeApplicant = this.removeApplicant.bind(this);
    //   this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

    }

    // toggleCart() {
    //     // change the button
    //     var t = this;
    //     var stat = t.state.prompt;

    //     if (stat === "REJECT") {
    //         stat = "ACCEPT";

    //     } else {
    //         stat = "REJECT";
    //     }

    //     t.setState({
    //         prompt: stat
    //     });

    //     // add or remove this user from the list of accepted applicants (for review)
    //     if (typeof t.props.toggleFunction === 'function') {
    //         t.props.toggleFunction(t.props.applicantInfo.UTORid)
    //     }

    //     //
    //     // CANT TEST BACKEND IS NOT WORKING FOR ME
    //     var applicantQuery = "";
    //     var numTAsQuery = ""
    //     if (stat === "ACCEPT") {
    //         // this means that this applicant was just rejected
    //         // fetch('/API', {
    //         //     method: 'DELETE',
    //         //     credentials: 'include',
    //         //     headers: {
    //         //         'Accept': 'application/json',
    //         //         'Content-Type': 'application/json'
    //         //     },
    //         //     body: JSON.stringify({
    //         //         applicant: t.props.applicantInfo.studentNumber,
    //         //         course: t.props.courseUnderConsideration
    //         //     })
    //         // })
    //         // .catch(function(error) {
    //         //     throw error;
    //         // });

    //         // one more spot opened update
    //         numTAsQuery = "inc";
    //         t.props.numTAFunction(1);
    //         //var newVal = this.state.numberOfTAs + 1;
    //     } else {
    //         fetch('/createAssignment', {
    //             method: 'POST',
    //             credentials: 'include',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 course: t.props.courseUnderConsideration,
    //                 applicant: t.props.applicantInfo.studentNumber,
    //                 hour: 65
    //             })
    //         })
    //         .then(json)
    //         .then(function(data) {
    //             numTAsQuery = "dec"
    //             t.props.numTAFunction(-1);
    //         })
    //         .catch(function(error) {
    //             throw error;
    //         });
    //     }
    // }

    componentWillMount() {
        var t = this;
        console.log(t.state.studentNumber)
        fetch('/getApplicantInfo?studentNumber='+this.state.studentNumber, {method: 'GET'})
        .then(json)
        .then(function(data) {
            const applicant = data.data;
            
            if (data.status === 'success') {
                const applicant = data.data;
                t.setState({
                    applicantName: applicant.firstName + " " + applicant.lastName,
                    UTORid: applicant.UTORid,
                    phoneNumber: applicant.phoneNumber,
                    email: applicant.email,
                    programLevel: applicant.studentInformation.programLevel,
                    programName: applicant.studentInformation.programName,
                    year: applicant.studentInformation.year,
                    studentStatus: applicant.studentInformation.studentStatus,
                    workStatus: applicant.studentInformation.workStatus,
                    TAHistory: applicant.studentInformation.TAHistory
                    
                });
            }
        })
        .catch(function(err) {
            throw err;
        });
    }
    removeApplicant() {
        this.props.removeApplicant(this.state.studentNumber);
    }
    render() {
        // let app = this.state.applicant;
        
        // let head = this.props.applicantInfo.firstName + " " + this.props.applicantInfo.lastName;

        return (
            <Modal header={ this.state.applicantName}
                   trigger={
                            <CollectionItem>{ this.state.applicantName }</CollectionItem>
                           }>
                  <h4 className="thin">Basic Info</h4>
                  <p>Name: {this.state.applicantName}</p>
                  <p>UTORid: {this.state.UTORid}</p>      
                  <p>Student Number: { this.state.studentNumber}</p>
                  <p>Contact Information: Email: {this.state.email}, Phone Number: {this.state.phoneNumber}</p>
                  <h4 className="thin">Student Info</h4>
                  <p>Program: {this.state.programName},
                     {this.state.programLevel}</p>
                  <p>Year: {this.state.year}</p>
                  <p>Work Status: {this.state.workStatus}</p>
                  <h4 className="thin">Student History</h4>

                 <p> {JSON.stringify(this.state.TAHistory)}</p>
                  <div className="modal-footer">
                  <Button id="button" className="modal-action modal-close waves-effect indigo darken-3 btn" onClick={this.removeApplicant}>REMOVE ASSIGNMENT</Button>
                  </div>
            </Modal> 
        )
    }
}

/*
 {this.state.TAHistory.map(entry =>
                      <p key={entry.courseCode}>Course: {entry.courseCode}, Times TAd: {entry.timesTAd} </p> )}
          
                  
*/