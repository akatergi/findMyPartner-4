import React, { Component } from 'react';

class CollapsedNav extends Component {
    render() {
        const userButtons = this.props.userButtons
        return (
            <nav className="navbar navbar-expand-lg myNav navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">findMyPartner</a>
                    <button className="navbar-toggler" type="button" onClick={this.props.expandNav} data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
                    <ul className="dropdownNav mainUL">
                        <div className="nonuser2">
                                <a className="nav-link myNavLink" href="/users">All Users</a>
                                <a className="nav-link myNavLink" href="/matches">Generate Matches</a>
                                <a className="nav-link myNavLink" href="/find">Find Users</a>
                        </div>
                        {userButtons}
                    </ul>
                </div>
                {/* </div> */}
            </nav>
        )
    }
}

export default CollapsedNav