import React, { Component } from 'react';
import axios from 'axios';

const handleLogout = () => {
    axios.get("logout", {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then(console.log("logged out")).catch(err => console.log(err))
}

class Navbar extends Component {

    state = {
        success: false,
        userID: null
    }

    isLoggedIn = () => {
        axios.get("isLogged").then(res => res.data).then(e => this.setState({ success: e.success, userID: e.user ? e.user._id : null })).catch(e=>console.log(e))
    }

    render() {
        this.isLoggedIn()
        const userButtons = this.state.success ? <div className="user">
            <li className="nav-item">
                <a className="nav-link" href="/edit">Edit Profile</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href={`/users/${this.state.userID}`}>View Profile</a>
            </li>
            <button className="btn btn-small btn-danger" onClick={handleLogout}>Logout</button>
        </div> :
            <div className="user">
                <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/create">Register</a>
                </li>
            </div>
        return (
            <nav className="navbar navbar-expand-lg myNav navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/users">findMyPartner</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mainUL">
                            <div className="nonuser">
                                <li className="nav-item">
                                    <a className="nav-link" href="/users">All Users</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/matches">Generate Matches</a>
                                </li>
                            </div>
                            {userButtons}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar