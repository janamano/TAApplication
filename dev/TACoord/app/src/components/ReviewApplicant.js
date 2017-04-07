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
            TAHistory: '',
            applicant: ''
        };

      this.componentWillMount = this.componentWillMount.bind(this);
      this.removeApplicant = this.removeApplicant.bind(this);
      this.makeToast = this.makeToast.bind(this);
    }

    componentWillMount() {
        var t = this;

        fetch('/getApplicantInfo?studentNumber='+this.state.studentNumber, {method: 'GET'})
        .then(json)
        .then(function(data) {
            const applicant = data.data;
            
            if (data.status === 'success') {
                const applicant = data.data;
                t.setState({
                    TAHistory: applicant.studentInformation.TAHistory,
                    applicant: applicant,
                    applicantName: applicant.firstName + " " + applicant.lastName,
                    UTORid: applicant.UTORid,
                    phoneNumber: applicant.phoneNumber,
                    email: applicant.email,
                    programLevel: applicant.studentInformation.programLevel,
                    programName: applicant.studentInformation.programName,
                    year: applicant.studentInformation.year,
                    studentStatus: applicant.studentInformation.studentStatus,
                    workStatus: applicant.studentInformation.workStatus,
                    
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
    makeToast() {
        var t = this;
        Materialize.toast('Offer sent to ' + t.state.applicantName, 4000);
    }
    render() {
        
        // dont remove this: or else it wont work
        var TAHistory = [];
        var history = this.state.TAHistory;
 
        for (var i = 0; i < history.length; i++) {
            TAHistory.push(history[i]);
        }

        var buttonStyle = {
            marginRight: '5px'
        }

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
                  <p>Program: {this.state.programName}, {this.state.programLevel}</p>
                  <p>Year: {this.state.year}</p>
                  <p>Work Status: {this.state.workStatus}</p>
                  <h4 className="thin">Student History</h4>
                 {TAHistory.map(entry =>
                      <p key={entry.courseCode}>Course: {entry.courseCode}, Times TAd: {entry.timesTAd} </p> )}
                  <div className="modal-footer">
                  <Button id="button" className="modal-action modal-close waves-effect red darken-3 btn" onClick={this.removeApplicant}>Remove Assignment</Button>
                  <Button style={buttonStyle} id="button" className="modal-action modal-close waves-effect green accent-3 btn" onClick={this.makeToast}>Send Offer</Button>
                  
                  </div>
            </Modal> 
        )
    }
}

/*
          
                  {this.state.TAHistory.map(entry =>
                      <p key={entry.courseCode}>Course: {entry.courseCode}, Times TAd: {entry.timesTAd} </p> )}
*/