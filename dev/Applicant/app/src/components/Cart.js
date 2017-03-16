import React, { Component } from 'react';
import { Row, Button } from "react-materialize";

import Nav from './Nav';
import RankGroup from './RankGroup';

export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /* TODO: make this proper once calls and program flow are built fully
            coursesInCart: this.props.coursesinCart, */

            // Until then...
            coursesInCart: [
                {
                    code: "CSC108",
                    title: "Introduction to Computer Programming"
                },
                {
                    code: "CSC165",
                    title: "Mathematical Expression and Reasoning for Computer Science"
                }
            ],
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
        this.refreshRankGroups = this.refreshRankGroups.bind(this);
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

    refreshRankGroups() {

    }

    render() {
        const rankings = this.state.rankings;
        return (
            <div>
                <Nav heading={"Course Cart"} />
                <div className="cart">
                    <RankGroup rank={1} courses={rankings[1]} refreshRanks={this.refreshRankGroups}/>
                    <RankGroup rank={2} courses={rankings[2]} refreshRanks={this.refreshRankGroups}/>
                    <RankGroup rank={3} courses={rankings[3]} refreshRanks={this.refreshRankGroups}/>
                    <RankGroup rank={4} courses={rankings[4]} refreshRanks={this.refreshRankGroups}/>
                    <RankGroup rank={5} courses={rankings[5]} refreshRanks={this.refreshRankGroups}/>
                    <RankGroup rank={0} courses={rankings[0]} refreshRanks={this.refreshRankGroups}/>
                </div>
            </div>
        );
    }
}