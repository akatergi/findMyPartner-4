import React, { Component } from 'react';
import axios from 'axios';
import CollapsedNav from './CollapsedNav';
import DefaultNav from './DefaultNav';

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
        userID: null,
        collapsed: false
    }

    isLoggedIn = () => {
        axios.get("/isLogged").then(res => res.data).then(e => this.setState({ success: e.success, userID: e.user ? e.user._id : null })).catch(e => console.log(e))
    }

    expandNav = () => {
        this.setState(st => { return { collapsed: !st.collapsed } })
        console.log(this.state.collapsed)
    }

    render() {
        this.isLoggedIn()

        const userClass = this.state.collapsed ? "user2" : "user"

        const userButtons = this.state.success ?
            <div className={userClass}>
                <li className="nav-item">
                    <a className="nav-link myNavLink" href="/edit">Edit Profile</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link myNavLink" href={`/users/${this.state.userID}`}>View Profile</a>
                </li>
                <button className="btn btn-small btn-danger" onClick={handleLogout}>Logout</button>
            </div> 
            :
            <div className={userClass}>
                <li className="nav-item">
                    <a className="nav-link myNavLink" href="/login">Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link myNavLink" aria-current="page" href="/create">Register</a>
                </li>
            </div>
        return this.state.collapsed ? <CollapsedNav userButtons={userButtons} expandNav={this.expandNav} /> : <DefaultNav userButtons={userButtons} expandNav={this.expandNav} />
    }
}

export default Navbar