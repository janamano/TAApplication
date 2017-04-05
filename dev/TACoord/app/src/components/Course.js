import React, { Component } from 'react';
import { Row, Button, Collapsible, CollapsibleItem, Modal, Collection } from "react-materialize";
import Applicant from './Applicant';
import Filter from './Filter';

let utils = require('../utils.js');
let json = utils.json;

export default class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicants: [],
            applicantsCart: [],
            numberOfTAs: props.numberOfTAs,
            code: this.props.code
        };


        this.componentWillMount = this.componentWillMount.bind(this);
        this.toggleCart = this.toggleCart.bind(this);
        this.incTAs = this.incTAs.bind(this);
        // this.setFilter = this.setFilter.bind(this);
        this.isAssigned = this.isAssigned.bind(this);
        this.getIndex = this.getIndex.bind(this);
    }
    
    componentWillMount() {
        var t = this;
        
        // get all the applicants who applied to this course
        var query = '/getApplicants?course=' + t.state.code;
        fetch(query, {method: 'GET'})
            .then(json)
            .then(function(data) {
                // store this in the state courses to create course objects
                const applicants = data.data;
                t.setState({
                    applicants: applicants.map(function(applicant) {
                        return {UTORid: applicant.UTORid,
                                studentNumber: applicant.studentNumber,
                                lastName: applicant.lastName,
                                firstName: applicant.firstName,
                                phoneNumber: applicant.phoneNumber,
                                email: applicant.email,
                                studentInformation: applicant.studentInformation}
                    })
                });
            })
            .catch(function(err) {
            // fetch didnt work
            throw err;
        });

        fetch('/getAssignments?course='+this.props.code, {method :'GET'})
        .then(json)
        .then(function(data) {
            if (data.status === 'success') {
                const applicants = data.data;
                t.setState({
                    applicantsCart: applicants.map(function(applicant) {
                        return {studentNumber : applicant.studentNumber}
                    })
                });
            }
        })
        .catch(function(err) {
            throw err;
        });
    }

    toggleCart(student) {
        var t = this;
        var cart = t.state.applicantsCart;
        var index = this.getIndex(cart, student);
    
        if (index > -1) {
            // if the student is in the cart, remove them
            cart.splice(index, 1);
        } else {
            // otherwise add the student to cart
            cart.push({studentNumber: student});
        }
        
        this.setState({
                 applicantsCart: cart
        });
    }
    
    // get the index of given student
    getIndex(list, student) {
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (item.studentNumber == student) {
              return i;
            }
        }   
        return -1;
    }

    // to check if an applicat is currently assigned to this course
    isAssigned(applicant) {
        var t = this;
        var cart = this.state.applicantsCart;
        if (! cart) {
            // not assigned
            return "ACCEPT";
        } else {
            // there is a cart for this course
            var index = this.getIndex(cart, applicant);
            if (index > -1) {
                return "REJECT"; // REJECT
            } else {
                return "ACCEPT";
            }
        }
    }

    // setFilter(grad, taed) {
    //     var constructQuery = "?query=";
    //     //query=grad;takenPreq;TAed=CSC108
    //     if (grad && taed) {
    //         constructQuery += "grad;TAed=" + this.props.code;
    //     } else if (grad) {
    //         constructQuery += "grad";            
    //     } else if (taed) {
    //         constructQuery += "TAed=" + this.props.code;                        
    //     }
        
    //     if (constructQuery != "query=") {
    //         // make fetch call
    //         fetch('/filter' + "?" + constructQuery, {method: 'GET'})
    //             .then(json)
    //             .then(function(data) {
    //                 // store this in the state courses to create course objects
    //                 const applicants = data.data;
    //                 t.setState({
    //                     applicants: applicants.map(function(applicant) {
    //                         return {UTORid: applicant.UTORid,
    //                                 studentNumber: applicant.studentNumber,
    //                                 lastName: applicant.lastName,
    //                                 firstName: applicant.firstName,
    //                                 phoneNumber: applicant.phoneNumber,
    //                                 email: applicant.email,
    //                                 studentInformation: applicant.studentInformation}
    //                     })
    //                 });
    //             })
    //             .catch(function(err) {
    //             // fetch didnt work
    //             throw err;
    //         });
    //     }
    // }

    incTAs(value) {
        let current = this.state.numberOfTAs;
        current += value;
        this.setState({
            numberOfTAs: current
        });
        
    } 
    
    render() {
        let head = this.props.code + ": " + this.props.title;
        var style = {
            textAlign: 'left'
        }
        return (

        <CollapsibleItem style={style} header={ head }>
                <p>Course Code: {this.props.code}</p>
                <p>Title: {this.props.title}</p>
                <p>Number of TAs: {this.state.numberOfTAs}</p>
                <p>Qualifications: {this.props.qualifications}</p>
                <Collapsible>
                    <CollapsibleItem header="View Applicants">
                        <Collection>
                        {this.state.applicants.map(applicant =>
                            <Applicant key={applicant.studentNumber}
                                       applicantInfo={applicant}
                                       prompt={this.isAssigned.bind(this)}
                                       courseUnderConsideration={this.state.code}
                                       toggleFunction={this.toggleCart.bind(this)}                                
                                       numTAFunction={this.incTAs.bind(this)}
                                       numberOfTAs={this.state.numberOfTAs} />
                        )}
                        </Collection>
                    </CollapsibleItem>
                </Collapsible>
                
                
        </CollapsibleItem>
        )
    }
}