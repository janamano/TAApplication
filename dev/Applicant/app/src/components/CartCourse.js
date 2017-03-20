import React, { Component } from 'react';
import { Button, CollapsibleItem } from "react-materialize";

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
        var style = {
            textAlign: 'left',
            marginTop: '1.3%',
            marginBottom: '1.5%'
        };
        var style2 = {
            float: 'right'
        }
        let cart = 
                <Button style={style2} waves='light' onClick={(evt) => this.props.handleRemove(evt, this.state.rank, this.state.code)}>
                    Remove From Cart
                </Button>;

        let heading = 
            <span>
                <span className="course-code">
                    <b>{this.state.code}</b>
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
                <CollapsibleItem style={style} header={heading} icon='view_agenda' >
                    <CourseInfo code={this.state.code} />
                </CollapsibleItem>
            </div>
        );
    }
}