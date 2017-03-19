import React, { Component } from 'react';
import { Row, Button, Input } from "react-materialize";


export default class Applicant extends Component {
    constructor() {
        super();
    
    this.state = ({
        grad: false,
        taed: false
    });

    this.toggle = this.toggle.bind(this);
    }

    toggle(event) {
        var name = event.target.name;
       
        var newVal = event.target.value == "true";
        var newVal = !newVal;
        
        if (name === 'grad') {
            this.setState({
                 grad: newVal
            });
        } else {
            this.setState({
                 taed: newVal
            });
        }
    }
    
    setFilter() {
        this.props.setFilter(this.state.grad, this.state.taed);
    }

    render() {
        return (
            <div>
                <h6 className="thin">Filter Applicants</h6>
                <Row>
                    <Input onChange={this.toggle} name='grad' type='checkbox' value={true} label='Grad Students'/>
                    <Input onChange={this.toggle} name='ta' type='checkbox' value={false} label='Previously TAd'/>
                    <Button type='submit'  onClick={this.setFilter} >Apply Filter</Button>
                </Row>
            </div>
        )
    }
}
