import React, { Component } from 'react';
import { Row, Button, Collapsible, CollapsibleItem } from "react-materialize";


let applicantsConsidered = [];

export default class Course extends Component {
    constructor() {
        super();

        //this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    

    render() {
        return (
            <CollapsibleItem header={this.props.title}>
                <p>{this.props.code}</p>
                <p>{this.props.numberOfTAs}</p>
                <p>{this.props.qualifications}</p>
                

                <Button class='red' waves="light" onClick={this.removeStudent}>Deny</Button>
                <Button class='green' waves="light" onClick={this.addStudent}>Accept</Button>
            </CollapsibleItem>
        )
    }
}