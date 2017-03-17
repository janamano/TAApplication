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
        this.handleRemove = this.handleRemove.bind(this);
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

    refreshRankGroups(oldRank, newRank, code) {
        // index of course being moved
        const index = this.state.rankings[oldRank].findIndex(item => item.code === code);

        // course being moved
        const course = this.state.rankings[oldRank][index];

        // remove course from old rank group
        let oldRankCourses = this.state.rankings[oldRank].slice();
        oldRankCourses.splice(index, 1);

        // replace old rank group with new version
        let newRankings = this.state.rankings;
        newRankings[oldRank] = oldRankCourses;

        // if the course has actually been deleted, we call newRank as -1. in this 
        // case, we just set rankings to be the rankings without the old course (without
        // adding it back in to a new rank group)
        if (newRank === -1) {
            this.setState({
                rankings: newRankings
            });
        } else {
            // add course to new rank group
            let newRankCourses = this.state.rankings[newRank].slice();
            newRankCourses.push(course);

            // replace new rank group with new version
            newRankings[newRank] = newRankCourses
            this.setState({
                rankings: newRankings
            });
        }
    }

    handleRemove(event, rankToRefresh, code) {
        event.stopPropagation();

        // index of course being removed
        const index = this.state.coursesInCart.findIndex(item => item.code === code);

        // delete the course, and reset state
        let courses = this.state.coursesInCart.slice();
        courses.splice(index, 1);
        this.setState({
            coursesInCart: courses
        });

        // refresh groups to not include this course
        this.refreshRankGroups(rankToRefresh, -1, code);
    }

    render() {
        return (
            <div>
                <Nav heading={"Course Cart"} />
                <div className="cart">
                    <RankGroup rank={1} courses={this.state.rankings[1]} handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups}/>
                    <RankGroup rank={2} courses={this.state.rankings[2]} handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups}/>
                    <RankGroup rank={3} courses={this.state.rankings[3]} handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups}/>
                    <RankGroup rank={4} courses={this.state.rankings[4]} handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups}/>
                    <RankGroup rank={5} courses={this.state.rankings[5]} handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups}/>
                    <RankGroup rank={0} courses={this.state.rankings[0]} handleRemove={this.handleRemove} refreshRanks={this.refreshRankGroups}/>
                </div>
            </div>
        );
    }
}