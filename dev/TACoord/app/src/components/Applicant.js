import React, { Component } from 'react';
import { Row, Button, Collapsible, CollapsibleItem, Modal } from "react-materialize";


export default class Applicant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prompt: "",
            numberOfTAs: props.numberOfTAs,
            cantClick: props.cantClick
        };

      this.componentWillMount = this.componentWillMount.bind(this);
      this.toggleCart = this.toggleCart.bind(this);
      this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            numberOfTAs: nextProps.numberOfTAs
        }, function() {
            console.log("NEW VAL: " + this.state.numberOfTAs);
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

        var stat = this.state.prompt;

        if (stat === "REJECT") {
            stat = "ACCEPT";

        } else {
            stat = "REJECT";
        }

        this.setState({
            prompt: stat
        });

        // add or remove this user from the list of accepted applicants (for review)
        if (typeof this.props.toggleFunction === 'function') {
            this.props.toggleFunction(this.props.applicantInfo.UTORid)
        }

        //
        // CANT TEST BACKEND IS NOT WORKING FOR ME
        var applicantQuery = "";
        var numTAsQuery = ""
        if (stat === "ACCEPT") {
            // this means that this applicant was just rejected
            applicantQuery = "/rejectApplicant";
            // one more spot opened update
            numTAsQuery = "inc";
            this.props.numTAFunction(1);
            //var newVal = this.state.numberOfTAs + 1;
        } else {
            applicantQuery = "/acceptApplicant";
            numTAsQuery = "dec"
            this.props.numTAFunction(-1);
            console.log("UNF: " + this.state.numberOfTAs);
            //var newVal = this.state.numberOfTAs - 1;            
        }

        this.setState({
            numberOfTAs: newVal
        })

        if (this.props.numberOfTAs == 0 && prompt === "ACCEPT") {
            var newVal = !this.state.cantClick;
            this.setState({
                cantClick: newVal
            });
        }
        // update this applicant's status in the database
        // fetch(applicantQuery, {
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
        // // increment or decrement the number of tas needed
        // fetch('/API', {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         name: numTAsQuery
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
        let app = this.props.applicantInfo;

        let head = this.props.applicantInfo.firstName + " " + this.props.applicantInfo.lastName;

        return (
            <Modal header={ head }
                   trigger={
                            <ul><li>{ head }</li></ul>
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
                      <p key={entry.courseCode}>CourseCode: {entry.courseCode}, Times TAd: {entry.timesTAd} </p> )}
                  <div className="modal-footer">
                  <Button disabled={this.state.cantClick} id="button" className="modal-action modal-close waves-effect indigo darken-3 btn" onClick={this.toggleCart}>{this.state.prompt}</Button>
                  </div>
            </Modal> 
        )
    }
}
