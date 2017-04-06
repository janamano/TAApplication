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
        var style = {
            textAlign: 'left',
            fontSize: '1.35em'
        }
        var style2 = {
            fontSize: '1.1em'
        }
        return (
            <div>
                <br />
                <p style={style}>
                    <span className='thin'><b>Preference Level</b>: {(this.state.rank ===0) ? "Unranked" : this.state.rank}</span>
                </p>
                <Collapsible>
                    {(this.props.courses.length > 0) ?
                        this.props.courses.map(course =>
                        <div key={course.code} >
                            <CartCourse code={course.code}
                                    title={course.title}
                                    inCart={true}
                                    rank={this.state.rank}
                                    refreshRanks={this.helperRefreshRanks}
                                    handleRemove={this.helperHandleRemove}
                                    submitted={this.props.submitted}
                            />
                        </div>
                        )
                        :
                        <span style={style2}>No courses added to this preference level yet</span>
                    }
                </Collapsible>
            </div>
        );
    }
}