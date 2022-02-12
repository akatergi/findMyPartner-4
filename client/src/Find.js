import React, { Component } from 'react';
import './Find.css'
import axios from 'axios';

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

class Find extends Component {
    state = {
        test: "",
        langs: ["", "", "", "", ""],
        skills: ["", "", "", "", ""],
        results: [],
        index: 0,
        findState: 0
    }

    handleChange = (e, i) => {
        if (e.target.name === "langs") {
            let currLangs = [...this.state.langs];
            currLangs[i] = e.target.value;
            this.setState({
                langs: currLangs
            })
        }
        else {
            let currSkills = [...this.state.skills]
            currSkills[i] = e.target.value;
            this.setState({
                skills: currSkills
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        axios.post("finddata", { languages: this.state.langs.map(s => s.toLowerCase()).filter(s => s.length > 0), skills: this.state.skills.map(s => s.toLowerCase()).filter(s => s.length > 0) }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(res => this.setState({ results: res.data.matches, findState:1 })).catch(e => console.log(e))
    }

    moveBack = () => {
        if (this.state.index > 0) this.setState({ index: this.state.index - 1 })
    }

    moveNext = () => {
        if (this.state.index < this.state.results.length - 1) this.setState({ index: this.state.index + 1 })
    }

    render() {
        if (this.state.findState === 1) {
            console.log(this.state.results, this.state.results[this.state.index])
            var u = this.state.results[this.state.index].user;
            var p = this.state.results[this.state.index].percentage;
            var u2 = { languages: this.state.langs.map(s => s.toLowerCase()).filter(s => s.length > 0), skills: this.state.skills.map(s => s.toLowerCase()).filter(s => s.length > 0) }
        }
        return (
            <div className='container'>
                <h1 className="text-center display-3 mt-2 mb-1">Find Users</h1>
                <div className="row">
                    <form onSubmit={this.handleSubmit} className="col-3 search">
                        <div className="form-group">
                            <label className='prefLabel' htmlFor="langPref">Language Preferences:</label>
                            <input type="text" id="langPref" name="langs" value={this.state.langs[0]} onChange={e => this.handleChange(e, 0)} className="form-control inpPref" />
                            <input type="text" name="langs" value={this.state.langs[1]} onChange={e => this.handleChange(e, 1)} className="form-control inpPref" />
                            <input type="text" name="langs" value={this.state.langs[2]} onChange={e => this.handleChange(e, 2)} className="form-control inpPref" />
                            <input type="text" name="langs" value={this.state.langs[3]} onChange={e => this.handleChange(e, 3)} className="form-control inpPref" />
                            <input type="text" name="langs" value={this.state.langs[4]} onChange={e => this.handleChange(e, 4)} className="form-control inpPref" />
                        </div>
                        <div className="form-group">
                            <label className='prefLabel' htmlFor="skillPref">Skill Preferences:</label>
                            <input type="text" id="skillPref" name="skills" value={this.state.skills[0]} onChange={e => this.handleChange(e, 0)} className="form-control inpPref" />
                            <input type="text" name="skills" value={this.state.skills[1]} onChange={e => this.handleChange(e, 1)} className="form-control inpPref" />
                            <input type="text" name="skills" value={this.state.skills[2]} onChange={e => this.handleChange(e, 2)} className="form-control inpPref" />
                            <input type="text" name="skills" value={this.state.skills[3]} onChange={e => this.handleChange(e, 3)} className="form-control inpPref" />
                            <input type="text" name="skills" value={this.state.skills[4]} onChange={e => this.handleChange(e, 4)} className="form-control inpPref" />
                        </div>
                        <button className="btn btn-success btn-large mt-2" style={{ width: "100%" }}> Search </button>
                    </form>
                    <div className="col-9 res">
                        {/* ---------------------------------------------------------------------------------------------------------------------------------------------- */}
                        {this.state.findState === 1 ?
                            <div>
                                <div className="posButton">
                                    <button onClick={this.moveBack} className="myBtn backBtn">{"< Back"}</button>
                                    <button onClick={this.moveNext} className="myBtn nextBtn">{"Next >"}</button>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <h1 className="display-3 text-center mb-4">The #{this.state.index + 1} Closest Match: </h1>
                                        <div className="col-5">
                                            <h1 className="display-4 text-center">{u.username}</h1>
                                            <img className="mImage" alt="user photo" src={u.image} />
                                            <p class='prefDesc'>{u.description}</p>
                                        </div>
                                        <div className="col-6">
                                            <div className="matchInfo">
                                                <span className="infoSpan"> {u.username} is a(n) <b>{round(p * 100, 2)}%</b> Match! </span>
                                                <span className="infoSpan"> They are skilled in <b>{u.skills.filter(el => u2.skills.includes(el)).toString().replace(/,/g, ', ')}</b> </span>
                                                <span className="infoSpan"> They code in <b>{u.languages.filter(el => u2.languages.includes(el)).toString().replace(/,/g, ', ')}</b> </span>
                                            </div>
                                            <div className="userInfo userInfo2">
                                                <div className="mE"><span className="mTitle">Languages: </span>{u.languages.toString().replace(/,/g, ', ')}</div>
                                                <div className="mE"><span className="mTitle">Skills: </span>{u.skills.toString().replace(/,/g, ', ')}</div>
                                                <div className="mE"><span className="mTitle">Contact E-mail: </span>{u.email}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : ""}
                    </div>
                </div>
            </div>
        )
    }
}

export default Find