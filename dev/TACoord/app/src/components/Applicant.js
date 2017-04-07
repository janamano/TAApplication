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
            color: 'green accent-4'
        };

      this.componentWillMount = this.componentWillMount.bind(this);
      this.toggleCart = this.toggleCart.bind(this);
      this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

    }
    componentWillReceiveProps(nextProps) {
        var t = this;
        t.setState({
            numberOfTAs: nextProps.numberOfTAs,            
        });
        var prompt = this.props.prompt(this.props.applicantInfo.studentNumber);
        if (prompt === "ACCEPT") {
            this.setState({
                prompt: prompt,
                color: 'green accent-4'
            });
        } else {
            this.setState({
                prompt: prompt,
                color: 'red darken-2'
            });
        }
        
    }
    componentWillMount() {
        var prompt = this.props.prompt(this.props.applicantInfo.studentNumber);
        if (prompt === "ACCEPT") {
            this.setState({
                prompt: prompt
            });
        } else {
            this.setState({
                prompt: prompt,
                color: 'red darken-2'
            });
        }
    }
    
    toggleCart() {
        var t = this;

        // change the button
        var stat = t.state.prompt;
        var color = t.state.color;

        if (stat === "REJECT") {
            stat = "ACCEPT";
            color = 'green accent-4';
        } else {
            stat = "REJECT";
            color = 'red darken-2';
        }
        t.setState({
            prompt: stat,
            color: color
        });

        // add or remove this user from the list of accepted applicants (for review)
        if (typeof t.props.toggleFunction === 'function') {
            // t.props.toggleFunction(t.props.applicantInfo.studentNumber)
            t.props.toggleFunction(t.props.applicantInfo)
            
        }
        
        if (stat === "ACCEPT") {
            // this means that this applicant was just rejected
            t.props.numTAFunction(1);
        } else {
            t.props.numTAFunction(-1);
        }
    }


    render() {
        let app = this.props.applicantInfo;

        let head = this.props.applicantInfo.firstName + " " + this.props.applicantInfo.lastName;
        let className = "modal-action modal-close waves-effect btn " + this.state.color 
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
                  <Button id="button" className={ className } onClick={this.toggleCart}>{this.state.prompt}</Button>
                  </div>
            </Modal> 
        )
    }
}
