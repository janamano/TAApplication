import React, { Component } from 'react';
import { Row, Button, Collapsible, CollapsibleItem, Modal } from "react-materialize";


export default class Applicant extends Component {
    constructor() {
        super();

        this.state = {
            status: "ACCEPT",
        };

      //  console.log(this.props.academicHistory);
      this.toggleCart = this.toggleCart.bind(this);
    }
    
    toggleCart() {
        // change the button
        var stat = this.state.status;

        if (stat === "REJECT") {
            stat = "ACCEPT";
        } else {
            stat = "REJECT";
        }

        this.setState({
            status: stat
        });

        // add or remove this user from the list of accepted applicants (for review)
        if (typeof this.props.toggleFunction === 'function') {
            this.props.toggleFunction(this.props.UTORid)
        }


        // CANT TEST BACKEND IS NOT WORKING FOR ME
        // var query = "";
        // if (stat === "ACCEPT") {
        //     // this means that this applicant was just rejected
        //     query = "/rejectApplicant";
        // } else {
        //     query = "/acceptApplicant";
            
        // }
        // // update this applicant's status in the database
        // fetch(query, {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         courseCode: this.props.courseUnderConsideration,
        //         UTORid: this.props.UTORid                   
        //     })
        // })
        // .then(json)
        // .then(function(data) {
        //     //TODO
        // })
        // .catch(function(error) {
        //     throw error;
        // });
    }


    render() {
       // let applicant = this.state.applicant;
        let head = this.props.firstName + " " + this.props.lastName;
        var app = this.props;

        return (
            <Modal header={ head }
                   trigger={
                            <ul><li>{ head }</li></ul>
                           }>
                  <h4 className="thin">Basic Info</h4>
                  <p>Name: {this.props.firstName} {this.props.lastName}</p>
                  <p>UTORid: {this.props.UTORid}</p>                  
                  <p>Student Number: {this.props.studentNumber}</p>
                  <p>Contact Information: Email: {this.props.email}, Phone Number: {this.props.phoneNumber}</p>
                  <h4 className="thin">Student Info</h4>
                  <p>Program: {this.props.programName}, {this.props.programLevel}</p>
                  <p>Year: {this.props.year}</p>
                  <p>Work Status: {this.props.workStatus}</p>
                  <h4 className="thin">Student History</h4>
                  {this.props.TAHistory.map(entry =>
                      <p key={entry.courseCode}>CourseCode: {entry.courseCode}, Times TAd: {entry.timesTAd} </p> )}
                  <div className="modal-footer">
                  <Button id="button" className="modal-action modal-close waves-effect indigo darken-3 btn" onClick={this.toggleCart}>{this.state.status}</Button>
                  </div>
            </Modal> 
        )
    }
}

// not working, working on it

// <h4 className="thin">Academic History</h4>
//                   <ul>
//                     {this.props.academicHistory.map(entry =>
//                         <li> Course: {entry.courseCode}, Grade: {entry.grade}</li>
//                         )
//                     }
//                   </ul>
//                   <h4 className="thin">TA History</h4>
//                   <p>{this.props.TAHistory}</p>