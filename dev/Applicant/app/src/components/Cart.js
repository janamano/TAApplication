import React, { Component } from 'react';
import { Row, Button } from "react-materialize";

export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /* TODO: make this proper once calls and program flow are built fully
            coursesInCart: this.props.coursesinCart, */

            // Until then...
            coursesInCart: ["CSC108", "CSC165"],
            rankings: {
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                0: []
            }
        }

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        var t = this;

        /*
        TODO: once courses API is built, implement this fetch() 
        fetch('/courses-in-cart', { method: 'GET' })
            .then(json)
            .then(function(data) {
                const rankings = data.data.rankings;
                t.setState({
                    rankings: {
                        1: rankings['1'],
                        2: rankings['2'],
                        3: rankings['3'],
                        4: rankings['4'],
                        5: rankings['5'],
                        0: rankings['0']
                    }
                });
            })
            .catch(function(err) {
                throw err;
            });
        */

        // Until then...
        t.setState({
            rankings: {
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                0: this.state.coursesInCart
            }
        });
    }

    render() {
        return (
            <div className="cart">
                <PrefGroup rank={1} courses={rankings[1]} refreshRanks={this.refreshRankGroups}/>
                <RankGroup rank={2} courses={rankings[2]} refreshRanks={this.refreshRankGroups}/>
                <RankGroup rank={3} courses={rankings[3]} refreshRanks={this.refreshRankGroups}/>
                <RankGroup rank={4} courses={rankings[4]} refreshRanks={this.refreshRankGroups}/>
                <RankGroup rank={5} courses={rankings[5]} refreshRanks={this.refreshRankGroups}/>
                <RankGroup rank={0} courses={rankings[0]} refreshRanks={this.refreshRankGroups}/>
            </div>
        );
    }
}