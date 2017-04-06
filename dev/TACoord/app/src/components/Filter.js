import React, { Component } from 'react';
import { Row, Button, Input } from "react-materialize";


export default class Filter extends Component {
    constructor() {
        super();
    
    this.state = ({
        grad: false,
        taed: false
    });

    this.toggle = this.toggle.bind(this);
    }

    toggle(event) {
        var t = this;
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
        setTimeout(function() {
            t.props.setFilter(t.state.grad, t.state.taed);
        }, 100);
    }

    render() {
        return (
            <div>
                <h6 className="thin">Filter Applicants</h6>
                <Row>
                    <Input onChange={this.toggle} name='grad' type='checkbox' value={this.state.grad} label='Grad Students'/>
                    <Input onChange={this.toggle} name='ta' type='checkbox' value={this.state.taed} label='Previously TAd'/>
                </Row>
            </div>
        )
    }
}
