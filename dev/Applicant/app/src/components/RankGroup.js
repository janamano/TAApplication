import React, { Component } from 'react';
import { Button, Collapsible, CollapsibleItem } from "react-materialize";

import CartCourse from './CartCourse';
import Ranking from './Ranking';

export default class RankGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rank: props.rank,
            courses: props.courses,
        };

        this.helperHandleRemove = this.helperHandleRemove.bind(this);
    }

    helperHandleRemove(event, rankToRefresh, code) {
        this.forceUpdate();
        this.props.handleRemove(event, rankToRefresh, code);
        this.forceUpdate();
    }
 
    render() {
        return (
            <div>
                <br />
                Rank: {(this.state.rank ===0) ? "Unranked" : this.state.rank}
                <Collapsible>
                    {this.state.courses.map(course =>
                        <div key={course.code} >
                            <CartCourse code={course.code}
                                    title={course.title}
                                    inCart={true}
                                    rank={this.state.rank}
                                    refreshRanks={this.props.refreshRanks}
                                    handleRemove={this.helperHandleRemove}
                            />
                        </div>
                        )
                    }
                </Collapsible>
            </div>
        );
    }
}