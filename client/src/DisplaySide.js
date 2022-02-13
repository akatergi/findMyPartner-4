import React, { Component } from 'react';

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

class DisplaySide extends Component {
    render() {
        let u = this.props.u
        let u2 = this.props.u2
        let p = this.props.p
        return (
            <div>
                <div className="posButton">
                    <button onClick={this.props.moveBack} className="myBtn backBtn">{"< Back"}</button>
                    <button onClick={this.props.moveNext} className="myBtn nextBtn">{"Next >"}</button>
                </div>
                <div className="container">
                    <div className="row">
                        <h1 className="display-3 text-center mb-4">The #{this.props.index + 1} Closest Match: </h1>
                        <div className="col-5">
                            <h1 className="display-4 text-center">{u.username}</h1>
                            <img className="mImage" alt="user photo" src={u.image} />
                            <p className='prefDesc'>{u.description}</p>
                        </div>
                        <div className="col-6">
                            <div className="matchInfo mb-3">
                                <span className="infoSpan"> {u.username} is a(n) <b>{round(p * 100, 2)}%</b> Match! </span>
                                <span className="infoSpan"> They are skilled in <b>{u.skills.filter(el => u2.skills.includes(el)).toString().replace(/,/g, ', ')}</b> </span>
                                <span className="infoSpan"> They code in <b>{u.languages.filter(el => u2.languages.includes(el)).toString().replace(/,/g, ', ')}</b> </span>
                            </div>
                            <div className="userInfo userInfo2 ">
                                <div className="mE"><span className="mTitle">Languages: </span>{u.languages.toString().replace(/,/g, ', ')}</div>
                                <div className="mE"><span className="mTitle">Skills: </span>{u.skills.toString().replace(/,/g, ', ')}</div>
                                <div className="mE"><span className="mTitle">Contact E-mail: </span><a className="emailLink" href={`mailto:${u.email}`}>{u.email}</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplaySide