import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

function LoginUser() {
    const navigate = useNavigate()
    return <LoginUserM navigate={navigate} />
}

class LoginUserM extends Component {
    state = {
        username: "",
        password: "",
        unauthorized: false,
        errMessage: ""
    }

    componentDidCatch = (err, info) => {
        this.setState({ unauthorized: true, errMessage: err.message })
    }

    handlePost = e => {
        e.preventDefault()
        let loginBody = { username: this.state.username, password: this.state.password }
        axios.post('http://localhost:5000/login', loginBody, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(() => { return this.props.navigate("/users") })
            .catch(e => { console.log(e); this.setState({ unauthorized: true, errMessage: "Invalid credentials" }) })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        return (
            <form onSubmit={this.handlePost} className="container">
                {this.state.unauthorized ? <div class="alert alert-danger" role="alert">
                    {this.state.errMessage}
                </div> : ""}
                <div className="col-12">
                    <h1 className="display-3 mt-3 mb-2 text-center">Login</h1>
                    <div className="form-group" >
                        <label className="form-label" htmlFor="username" > Username </label>
                        <input className="form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="password" > Password </label>
                        <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="col-12">
                    <button style={{ marginLeft: "5%", width: "90%" }} className="btn btn-success mt-3"> Submit </button>
                </div>
            </form>
        )
    }
}

export default LoginUser