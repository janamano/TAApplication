import React, { Component } from 'react';
import { Row, Button, CollapsibleItem } from "react-materialize";

import CourseInfo from './CourseInfo';
import Ranking from './Ranking';

export default class CartCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: props.code,
            title: props.title,
            rank: props.rank
        };
    }
 
    render() {
        let cart = 
                <Button waves='light' onClick={(evt) => this.props.handleRemove(evt, this.state.rank, this.state.code)}>
                    Remove From Cart
                </Button>;

        let heading = 
            <span>
                <span className="course-code">
                    {this.state.code}
                </span>
                {": "}
                <span className="course-title">
                    {this.state.title}
                </span>
                <span>
                    {cart}
                </span>
                <br />
                <span>
                    <Ranking course={this.state.code} 
                            rank={this.props.rank} 
                            refreshRanks={this.props.refreshRanks}
                    />
                </span>
            </span>;
        return (
            <div>
                <CollapsibleItem header={heading} icon='view_agenda' >
                    <CourseInfo code={this.state.code} />
                </CollapsibleItem>
            </div>
        );
    }
}