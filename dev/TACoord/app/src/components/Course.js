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
            applicantsCart: this.props.currentlyAssigned,
            numberOfTAs: props.numberOfTAs
        };


        this.componentWillMount = this.componentWillMount.bind(this);
        this.toggleButton = this.toggleButton.bind(this);
        this.toggleCart = this.toggleCart.bind(this);
        this.incTAs = this.incTAs.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.isAssigned = this.isAssigned.bind(this);
    }
    
    componentWillMount() {
        // if (this.state.numberOfTAs == 0) {
        //     var newVal = !this.state.cantTakeMore;
        //     this.setState({
        //         cantTakeMore: newVal
        //     });
        // }

        var t = this;
        
        
        // get all the applicants who applied to this course
        var query = '/getApplicants?course=' + this.props.code;
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
        
    }

    toggleButton() {
        // if (this.state.numberOfTAs == 0) {
        //     var newVal = !this.state.cantTakeMore;
        //     this.setState({
        //         cantTakeMore: newVal
        //     });
        // }

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
    
    // get the index of given student
    getIndex(list, student) {
        console.log('student: ' + student)
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            console.log(item)
            console.log("current: " + item.studentNumber)
            if (item.studentNumber == student) {

                return i;
            }
        }   
        return -1;
    }

    // to check if an applicat is currently assigned to this course
    isAssigned(applicant) {
        var t = this;
        console.log(t.state.applicantsCart)
        console.log(t.props.currentlyAssigned)
        
        var carts = this.props.currentlyAssigned;
        if (! carts) {
            
            // not assigned
            return "ACCEPT" // "ACCEPT"
        } else {
            // there is a cart for this course
            var cart = carts.applicants;
            var index = this.getIndex(cart, applicant);
            console.log(index);
            if (index > -1) {
                console.log("reject " + applicant)
                return "REJECT"; // REJECT
            } else {
                console.log("accept " + applicant)                
                return "ACCEPT";
            }
        }
    }

    setFilter(grad, taed) {
        var constructQuery = "?query=";
        //query=grad;takenPreq;TAed=CSC108
        if (grad && taed) {
            constructQuery += "grad;TAed=" + this.props.code;
        } else if (grad) {
            constructQuery += "grad";            
        } else if (taed) {
            constructQuery += "TAed=" + this.props.code;                        
        }
        
        if (constructQuery != "query=") {
            // make fetch call
            fetch('/filter' + "?" + constructQuery, {method: 'GET'})
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
        }
    }

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
                        <Filter setFilter={this.setFilter.bind(this)}/>
                        <Collection>
                        {this.state.applicants.map(applicant =>
                            <Applicant key={applicant.studentNumber}
                                       onChange={this.toggleButton}
                                       //cantClick={this.state.cantTakeMore}
                                       applicantInfo={applicant}
                                       prompt={this.isAssigned.bind(this)}
                                       courseUnderConsideration={this.props.code}
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