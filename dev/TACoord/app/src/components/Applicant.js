import React, { Component } from 'react';
import { Row, Button, Collapsible, CollapsibleItem, Modal, CollectionItem } from "react-materialize";

let utils = require('../utils.js');
let json = utils.json;

export default class Applicant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prompt: "",
            numberOfTAs: props.numberOfTAs,
        };

      this.componentWillMount = this.componentWillMount.bind(this);
      this.toggleCart = this.toggleCart.bind(this);
      this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            numberOfTAs: nextProps.numberOfTAs
        });
    }
    componentWillMount() {
        var prompt = this.props.prompt(this.props.applicantInfo.UTORid);
        this.setState({
            prompt: prompt
        });
    }
    
    toggleCart() {
        // change the button
        var t = this;
        var stat = t.state.prompt;

        if (stat === "REJECT") {
            stat = "ACCEPT";

        } else {
            stat = "REJECT";
        }

        t.setState({
            prompt: stat
        });

        // add or remove this user from the list of accepted applicants (for review)
        if (typeof t.props.toggleFunction === 'function') {
            t.props.toggleFunction(t.props.applicantInfo.UTORid)
        }

        //
        // CANT TEST BACKEND IS NOT WORKING FOR ME
        var applicantQuery = "";
        var numTAsQuery = ""
        if (stat === "ACCEPT") {
            // this means that this applicant was just rejected
            fetch('/API', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    applicant: t.props.applicantInfo.studentNumber,
                    course: t.props.courseUnderConsideration
                })
            })
            .catch(function(error) {
                throw error;
            });

            // one more spot opened update
            numTAsQuery = "inc";
            t.props.numTAFunction(1);
            //var newVal = this.state.numberOfTAs + 1;
        } else {
            fetch('/createAssignment', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    course: t.props.courseUnderConsideration,
                    applicant: t.props.applicantInfo.studentNumber,
                    hour: 65
                })
            })
            .then(json)
            .then(function(data) {
                numTAsQuery = "dec"
                t.props.numTAFunction(-1);
            })
            .catch(function(error) {
                throw error;
            });
        }
    }


    render() {
        let app = this.props.applicantInfo;

        let head = this.props.applicantInfo.firstName + " " + this.props.applicantInfo.lastName;

        return (
            <Modal header={ head }
                   trigger={
                            <CollectionItem>{ head }</CollectionItem>
                           }>
                  <h4 className="thin">Basic Info</h4>
                  <p>Name: {app.firstName} {app.lastName}</p>
                  <p>UTORid: {app.UTORid}</p>                  
                  <p>Student Number: {app.studentNumber}</p>
                  <p>Contact Information: Email: {app.email}, Phone Number: {app.phoneNumber}</p>
                  <h4 className="thin">Student Info</h4>
                  <p>Program: {app.studentInformation.programName}, {app.studentInformation.programLevel}</p>
                  <p>Year: {app.studentInformation.year}</p>
                  <p>Work Status: {app.studentInformation.workStatus}</p>
                  <h4 className="thin">Student History</h4>
                  {app.studentInformation.TAHistory.map(entry =>
                      <p key={entry.courseCode}>Course: {entry.courseCode}, Times TAd: {entry.timesTAd} </p> )}
                  <div className="modal-footer">
                  <Button id="button" className="modal-action modal-close waves-effect indigo darken-3 btn" onClick={this.toggleCart}>{this.state.prompt}</Button>
                  </div>
            </Modal> 
        )
    }
}
