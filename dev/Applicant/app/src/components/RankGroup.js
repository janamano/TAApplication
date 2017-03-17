import React, { Component } from 'react';
import { Button, Collapsible } from "react-materialize";

import CartCourse from './CartCourse';
import Ranking from './Ranking';

export default class RankGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rank: props.rank,
        };

        this.helperRefreshRanks = this.helperRefreshRanks.bind(this);
        this.helperHandleRemove = this.helperHandleRemove.bind(this);
    }

    helperRefreshRanks(oldRank, newRank, code) {
        // move course from oldRank RankGroup to newRank RankGroup
        this.props.refreshRanks(oldRank, newRank, code);
        this.forceUpdate();
    }

    helperHandleRemove(event, rankToRefresh, code) {
        // remove course from parent component's data
        this.props.handleRemove(event, rankToRefresh, code);
        this.forceUpdate();
    }
 
    render() {
        return (
            <div>
                <br />
                Rank: {(this.state.rank ===0) ? "Unranked" : this.state.rank}
                <Collapsible>
                    {this.props.courses.map(course =>
                        <div key={course.code} >
                            <CartCourse code={course.code}
                                    title={course.title}
                                    inCart={true}
                                    rank={this.state.rank}
                                    refreshRanks={this.helperRefreshRanks}
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