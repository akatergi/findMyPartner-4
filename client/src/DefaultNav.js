import React, { Component } from 'react';

class DefaultNav extends Component{
    render(){
        const userButtons = this.props.userButtons
        return(
            <nav className="navbar navbar-expand-lg myNav navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">findMyPartner</a>
                    <button className="navbar-toggler" onClick={this.props.expandNav} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
                                <li className="nav-item">
                                    <a className="nav-link" href="/find">Find Users</a>
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

export default DefaultNav