import React, { Component } from 'react';
import axios from 'axios';
import "./Match.css"

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

class Matches extends Component {
    state = {
        matchData: [],
        success: false,
        currUser: { languages: ["C++", "Ruby"], skills: ["OOP"] },
        index: 0
    }
    generateBody = () => {
        if (!this.state.success) return <h1 className="display-3 py-4 text-danger bg-warning text-center"><b>You must be signed in to view this page</b></h1>
        let u = this.state.matchData[this.state.index].user
        let p = this.state.matchData[this.state.index].percentage
        let u2 = this.state.currUser

        return (
            <div>
                <div className="posButton">
                    <button onClick={this.moveBack} className="myBtn backBtn">{"< Back"}</button>
                    <button onClick={this.moveNext} className="myBtn nextBtn">{"Next >"}</button>
                </div>
                <div className="container">
                    <div className="row">
                        <h1 className="display-3 text-center mb-4">Your #{this.state.index + 1} Closest Match: </h1>
                        <div className="col-5">
                            <img className="mImage" src={u.image} />
                        </div>
                        <div className="col-6">
                            <div className="matchInfo">
                                <span className="infoSpan"> You and {u.username} are a(n) <b>{round(p * 100, 2)}%</b> Match! </span>
                                <span className="infoSpan"> You are both skilled in <b>{u.skills.filter(el => u2.skills.includes(el)).toString()}</b> </span>
                                <span className="infoSpan"> You both code in <b>{u.languages.filter(el => u2.languages.includes(el)).toString()}</b> </span>
                            </div>
                            <div className="userInfo">
                                <div className="mE"><span className="mTitle">Username: </span>{u.username}</div>
                                <div className="mE"><span className="mTitle">Description: </span>{u.description}</div>
                                <div className="mE"><span className="mTitle">Languages: </span>{u.languages.toString()}</div>
                                <div className="mE"><span className="mTitle">Skills: </span>{u.skills.toString()}</div>
                                <div className="mE"><span className="mTitle">Contact E-mail: </span>{u.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    moveBack = () => {
        if (this.state.index > 0) this.setState({ index: this.state.index - 1 })
    }

    moveNext = () => {
        // console.log(this.state.matchData.length, this.state.index)
        if (this.state.index < this.state.matchData.length - 1) this.setState({ index: this.state.index + 1 })
    }

    componentDidMount = () => {
        axios.get('matchdata', {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(res => res.data).then(e => this.setState({ success: e.success, matchData: e.matches, currUser: e.currUser }))
    }

    render() {
        return (
            <div>
                {this.generateBody()}
            </div>
        )
    }
}

export default Matches